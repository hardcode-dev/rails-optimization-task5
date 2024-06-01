require 'openssl'
require 'faraday'
require 'async'

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

# Есть три типа эндпоинтов API
# Тип A:
#   - работает 1 секунду
#   - одновременно можно запускать не более трёх
# Тип B:
#   - работает 2 секунды
#   - одновременно можно запускать не более двух
# Тип C:
#   - работает 1 секунду
#   - одновременно можно запускать не более одного
#
def a(value)
  puts "https://localhost:9292/a?value=#{value}"
  Faraday.get("https://localhost:9292/a?value=#{value}").body
end

def b(value)
  puts "https://localhost:9292/b?value=#{value}"
  Faraday.get("https://localhost:9292/b?value=#{value}").body
end

def c(value)
  puts "https://localhost:9292/c?value=#{value}"
  Faraday.get("https://localhost:9292/c?value=#{value}").body
end

# Референсное решение, приведённое ниже работает правильно, занимает ~19.5 секунд
# Надо сделать в пределах 7 секунд

def collect_sorted(arr)
  arr.sort.join('-')
end

def async_method_calls(items = [])
  Async do
    items.each do |(method_name, buf, *values)|
      values.each do |value|
        Fiber.schedule do
          buf[value] = send(method_name, value)
        end
      end
    end
  end.wait
end

def c_via_ab(value)
  ab_value = "#{collect_sorted(@a[value].values)}-#{@b[value]}"

  puts "AB#{value} = #{ab_value}"

  c_value = c(ab_value)

  puts "C#{value} = #{c_value}"

  c_value
end

def result(value = nil)
  a(collect_sorted(@c.values_at(1, 2, 3)))
end

start = Time.now

@a = Hash.new { |h, k| h[k] = {} }
@b = {}
@c = {}

instructions = [
  [
    [:a, @a[1], 11, 12, 13],
    [:b, @b, 1, 2],
  ],
  [
    [:a, @a[2], 21, 22, 23],
    [:b, @b, 3],
    [:c_via_ab, @c, 1],
  ],
  [
    [:c_via_ab, @c, 2],
    [:a, @a[3], 31, 32, 33]
  ],
  [
    [:c_via_ab, @c, 3],
  ],
  [
    [:result, @a, :result]
  ]
]

instructions.each do |instruction|
  async_method_calls(instruction)
end

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{@a[:result]}" # 0bbe9ecf251ef4131dd43e1600742cfb

require 'openssl'
require 'faraday'
require 'async'
require 'async/semaphore'
require 'async/barrier'

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

start = Time.now

@a = Hash.new { |h, k| h[k] = [] }
@b = {}
@c = {}

Async do
  semaphores = { a: 3, b: 2, c: 1 }.transform_values { |value| Async::Semaphore.new(value) }
  barriers = Hash.new { |h, k| h[k] = Hash.new { |hh, kk| hh[kk] = Async::Barrier.new } }

  {1 => [11, 12, 13], 2 => [21, 22, 23], 3 => [31, 32, 33]}.each do |index, batch|
    semaphores[:b].async(parent: barriers[:b][index]) do
      @b[index] = b(index)
    end

    batch.each do |value|
      semaphores[:a].async(parent: barriers[:a][index]) do
        @a[index] << a(value)
      end
    end
  end

  [1, 2, 3].each do |index|
    semaphores[:c].async do
      barriers[:a][index].wait
      barriers[:b][index].wait

      ab_value = "#{collect_sorted(@a[index])}-#{@b[index]}"

      puts "AB#{index} = #{ab_value}"

      @c[index] = c(ab_value)

      puts "C#{index} = #{@c[index]}"
    end
  end
end

result = a(collect_sorted(@c.values))

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb

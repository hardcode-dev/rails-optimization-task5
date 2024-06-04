require 'openssl'
require 'faraday'

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
  Thread.new do
    puts "https://localhost:9292/a?value=#{value}"
    Faraday.get("https://localhost:9292/a?value=#{value}").body
  end
end

def b(value)
  Thread.new do
    puts "https://localhost:9292/b?value=#{value}"
    Faraday.get("https://localhost:9292/b?value=#{value}").body
  end
end

def c(value)
  Thread.new do
    puts "https://localhost:9292/c?value=#{value}"
    Faraday.get("https://localhost:9292/c?value=#{value}").body
  end
end

# Референсное решение, приведённое ниже работает правильно, занимает ~19.5 секунд
# Надо сделать в пределах 7 секунд

def collect_sorted(arr)
  arr.map(&:value).sort.join('-')
end

start = Time.now

### 1 queue
a11 = a(11)
a12 = a(12)
a13 = a(13)
b1 = b(1)
b2 = b(2)

ab1 = "#{collect_sorted([a11, a12, a13])}-#{b1.value}"
puts "AB1 = #{ab1}"

c1 = c(ab1)
puts "C1 = #{c1}"

### 2 queue
a21 = a(21)
a22 = a(22)
a23 = a(23)
b3 = b(3)

ab2 = "#{collect_sorted([a21, a22, a23])}-#{b2.value}"
puts "AB2 = #{ab2}"

c2 = c(ab2)
puts "C2 = #{c2}"

### 3 queue
a31 = a(31)
a32 = a(32)
a33 = a(33)

ab3 = "#{collect_sorted([a31, a32, a33])}-#{b3.value}"
puts "AB3 = #{ab3}"

c3 = c(ab3)
puts "C3 = #{c3}"

c123 = collect_sorted([c1, c2, c3])
result = a(c123).value

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb

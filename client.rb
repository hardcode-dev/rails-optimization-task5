require 'openssl'
require 'faraday'
require 'async'
require 'async/barrier'
require 'async/semaphore'

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
  arr.compact.sort.join('-')
end

start = Time.now

result = Async do
  barrier = Async::Barrier.new
  semaphore_a = Async::Semaphore.new(3, parent: barrier)
  semaphore_b = Async::Semaphore.new(2, parent: barrier)
  semaphore_c = Async::Semaphore.new(1, parent: barrier)

  a_results = {
    batch1: Array.new(3),
    batch2: Array.new(3),
    batch3: Array.new(3)
  }
  b_results = Array.new(3)
  c_results = Array.new(3)

  3.times do |i|
    semaphore_a.async do
      a_results[:batch1][i] = a(11 + i)
      a_results[:batch2][i] = a(21 + i)
    end
  end

  2.times do |i|
    semaphore_b.async { b_results[i] = b(i + 1) }
  end

  barrier.wait

  ab1 = "#{collect_sorted(a_results[:batch1])}-#{b_results[0]}"
  ab2 = "#{collect_sorted(a_results[:batch2])}-#{b_results[1]}"

  semaphore_c.async do
    c_results[0] = c(ab1)
    c_results[1] = c(ab2)
  end

  3.times do |i|
    semaphore_a.async { a_results[:batch3][i] = a(31 + i) }
  end

  semaphore_b.async { b_results[2] = b(3) }

  barrier.wait

  ab3 = "#{collect_sorted(a_results[:batch3])}-#{b_results[2]}"
  semaphore_c.async { c_results[2] = c(ab3) }

  barrier.wait

  c123 = collect_sorted(c_results)
  a(c123)
end.wait

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb

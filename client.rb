require 'openssl'
require 'faraday'

require 'async'
require 'async/semaphore'
require 'async/barrier'
require 'async/waiter'

require 'benchmark'
require 'pry'

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
  ->() {
    puts "https://localhost:9292/a?value=#{value}"
    Async { Faraday.get("https://localhost:9292/a?value=#{value}").body }
  }
end

def b(value)
  ->() {
    puts "https://localhost:9292/b?value=#{value}"
    Async { Faraday.get("https://localhost:9292/b?value=#{value}").body }
  }
end

def c(value)
  ->() {
    puts "https://localhost:9292/c?value=#{value}"
    Async { Faraday.get("https://localhost:9292/c?value=#{value}").body }
  }
end

# Референсное решение, приведённое ниже работает правильно, занимает ~19.5 секунд
# Надо сделать в пределах 7 секунд

def collect_sorted(arr)
  arr.sort.join('-')
end

start = Time.now

a11, a12, a13, a21, a22, a23, a31, a32, a33,
b1, b2, b3,
ab1, ab2, ab3,
c1, c2, c3,
result = nil

a1_barrier = Async::Barrier.new
a2_barrier = Async::Barrier.new
a3_barrier = Async::Barrier.new
b1_barrier = Async::Barrier.new
b3_barrier = Async::Barrier.new
c1_barrier = Async::Barrier.new
c2_barrier = Async::Barrier.new
c3_barrier = Async::Barrier.new

# a_semaphore = Async::Semaphore.new(3)
# b_semaphore = Async::Semaphore.new(2)

Async do
  Async do
    a11, a12, a13 = [a(11), a(12), a(13)].map do |task|
      a1_barrier.async do
        task.call.wait
        # a11, a12, a13 = [a(11).call.wait, a(12).call.wait, a(13).call.wait]
      end
    end

    b1, b2 = [b(1), b(2)].map do |task|
      b1_barrier.async do
        task.call.wait
      end
    end

    a1_barrier.wait
    a21, a22, a23 = [a(21), a(22), a(23)].map do |task|
      a2_barrier.async do
        task.call.wait
      end
    end

    b1_barrier.wait
    b3_barrier.async do
      b3 = b(3).call.wait
    end
    ab1 = "#{collect_sorted([a11.wait, a12.wait, a13.wait])}-#{b1.wait}"

    c1_barrier.async do
      c1 = c(ab1).call.wait
    end

    a2_barrier.wait
    a31, a32, a33 = [a(31), a(32), a(33)].map do |task|
      a3_barrier.async do
        task.call.wait
      end
    end
    ab2 = "#{collect_sorted([a21.wait, a22.wait, a23.wait])}-#{b2.wait}"

    c1_barrier.wait
    c2_barrier.async do
      c2 = c(ab2).call.wait
    end

    a3_barrier.wait
    b3_barrier.wait
    ab3 = "#{collect_sorted([a31.wait, a32.wait, a33.wait])}-#{b3}"

    c2_barrier.wait
    c3_barrier.async do
      c3 = c(ab3).call.wait
    end

    c3_barrier.wait
    c123 = collect_sorted([c1, c2, c3])
    result = a(c123).call.wait
  end
end

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb

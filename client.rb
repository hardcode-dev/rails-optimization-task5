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
  -> {
    puts "http://localhost:9292/a?value=#{value}"
    Async(transient: true) { Faraday.get("http://localhost:9292/a?value=#{value}").body }.wait
  }
end

def b(value)
  -> {
    puts "http://localhost:9292/b?value=#{value}"
    Async(transient: true) { Faraday.get("http://localhost:9292/b?value=#{value}").body }.wait
  }
end

def c(value)
  -> {
    puts "http://localhost:9292/c?value=#{value}"
    Async(transient: true) { Faraday.get("http://localhost:9292/c?value=#{value}").body }.wait
  }
end

# Референсное решение, приведённое ниже работает правильно, занимает ~19.5 секунд
# Надо сделать в пределах 7 секунд

def collect_sorted(arr)
  arr.sort.join('-')
end

start = Time.now

a11, a12, a13,
a21, a22, a23,
a31, a32, a33,
b1, b2, b3,
ab1, ab2, ab3,
c1, c2, c3,
result = nil

a_semaphore = Async::Semaphore.new(3)
b_semaphore = Async::Semaphore.new(2)
c_semaphore = Async::Semaphore.new(1)

def async_call(&block) Async(transient: true, &block) end

Sync do
  a11, a12, a13, a21, a22, a23, a31, a32, a33 = [a(11), a(12), a(13), a(21), a(22), a(23), a(31), a(32), a(33)].map do |task|
    async_call do
      a_semaphore.async do
        task.call
      end.wait
    end
  end

  b1, b2, b3 = [b(1), b(2), b(3)].map do |task|
    async_call do
      b_semaphore.async do
        task.call
      end.wait
    end
  end

  ab1 = async_call { "#{collect_sorted([a11.wait, a12.wait, a13.wait])}-#{b1.wait}" }
  ab2 = async_call { "#{collect_sorted([a21.wait, a22.wait, a23.wait])}-#{b2.wait}" }
  ab3 = async_call { "#{collect_sorted([a31.wait, a32.wait, a33.wait])}-#{b3.wait}" }

  c1 = async_call do
    c_semaphore.async do
      c(ab1.wait).call
    end.wait
  end

  c2 = async_call do
    c_semaphore.async do
      c(ab2.wait).call
    end.wait
  end

  c3 = async_call do
    c_semaphore.async do
      c(ab3.wait).call
    end.wait
  end

  c123 = collect_sorted([c1.wait, c2.wait, c3.wait])
  result = Async { a(c123).call }
end

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{result.wait}" # 0bbe9ecf251ef4131dd43e1600742cfb

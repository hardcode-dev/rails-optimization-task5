require 'openssl'
require 'faraday'
require 'async'
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
  arr.sort.join('-')
end

# Создаём семафоры для ограничения параллельных запросов
SEMAPHORE_A = Async::Semaphore.new(3) # максимум 3 одновременных запроса типа A
SEMAPHORE_B = Async::Semaphore.new(2) # ма  ксимум 2 одновременных запроса типа B
SEMAPHORE_C = Async::Semaphore.new(1) # максимум 1 запрос типа C
EXPECTED_HASH = "0bbe9ecf251ef4131dd43e1600742cfb"
MAX_EXECUTION_TIME = 7

start = Time.now
result = Sync do
  ab1 = Async do
    b1 = SEMAPHORE_B.async{ b(1) } # так как запросы B выполняются дольше (2 секунды),
                                   # их нужно запускать первыми, чтобы они начали выполняться как можно раньше
                                   # и не блокировали остальные операции в конце
    a11 = SEMAPHORE_A.async{ a(11) }
    a12 = SEMAPHORE_A.async{ a(12) }
    a13 = SEMAPHORE_A.async{ a(13) }

    "#{collect_sorted([a11.wait, a12.wait, a13.wait])}-#{b1.wait}"
  end

  ab2 = Async do
    b2 = SEMAPHORE_B.async{ b(2) }
    a21 = SEMAPHORE_A.async{ a(21) }
    a22 = SEMAPHORE_A.async{ a(22) }
    a23 = SEMAPHORE_A.async{ a(23) }
    "#{collect_sorted([a21.wait, a22.wait, a23.wait])}-#{b2.wait}"
  end

  ab3 = Async do
    b3 = SEMAPHORE_B.async{ b(3) }
    a31 = SEMAPHORE_A.async{ a(31) }
    a32 = SEMAPHORE_A.async{ a(32) }
    a33 = SEMAPHORE_A.async{ a(33) }
    "#{collect_sorted([a31.wait, a32.wait, a33.wait])}-#{b3.wait}"
  end

  c123 = Async do
    c1 = SEMAPHORE_C.async{ c(ab1.wait) }
    c2 = SEMAPHORE_C.async{ c(ab2.wait) }
    c3 = SEMAPHORE_C.async{ c(ab3.wait) }
    collect_sorted([c1.wait, c2.wait, c3.wait])
  end

  a(c123.wait)
end

total_time = Time.now - start
puts "FINISHED in #{total_time}s."
puts "VALID DURATION: #{total_time < MAX_EXECUTION_TIME}"
puts "RESULT = #{result}"
puts "VALID RESULT: #{result==EXPECTED_HASH}"

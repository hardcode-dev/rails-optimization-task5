require 'openssl'
require 'faraday'
require 'byebug'
require 'async'
require 'async/barrier'
require 'async/semaphore'
require 'thread/local'

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

def original_implementation
  a11 = a(11)
  a12 = a(12)
  a13 = a(13)
  b1 = b(1)

  ab1 = "#{collect_sorted([a11, a12, a13])}-#{b1}"
  puts "AB1 = #{ab1}"

  c1 = c(ab1)
  puts "C1 = #{c1}"

  a21 = a(21)
  a22 = a(22)
  a23 = a(23)
  b2 = b(2)

  ab2 = "#{collect_sorted([a21, a22, a23])}-#{b2}"
  puts "AB2 = #{ab2}"

  c2 = c(ab2)
  puts "C2 = #{c2}"

  a31 = a(31)
  a32 = a(32)
  a33 = a(33)
  b3 = b(3)

  ab3 = "#{collect_sorted([a31, a32, a33])}-#{b3}"
  puts "AB3 = #{ab3}"

  c3 = c(ab3)
  puts "C3 = #{c3}"

  c123 = collect_sorted([c1, c2, c3])
  result = a(c123)
  puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb
end

def threads
  a11 = Thread.new { a(11) }
  a12 = Thread.new { a(12) }
  a13 = Thread.new { a(13) }
  b1 = Thread.new { b(1) }
  b2 = Thread.new { b(2) }

  [a11, a12, a13].each(&:join)

  a21 = Thread.new { a(21) }
  a22 = Thread.new { a(22) }
  a23 = Thread.new { a(23) }
  b1.join
  b3 = Thread.new { b(3) }

  ab1 = "#{collect_sorted([a11.value, a12.value, a13.value])}-#{b1.value}"
  puts "AB1 = #{ab1}"
  c1 = Thread.new { c(ab1) }

  [a21, a22, a23].each(&:join)

  ab2 = "#{collect_sorted([a21.value, a22.value, a23.value])}-#{b2.value}"
  c1.join
  puts "C1 = #{c1.value}"
  puts "AB2 = #{ab2}"

  c2 = Thread.new { c(ab2) }


  a31 = Thread.new { a(31) }
  a32 = Thread.new { a(32) }
  a33 = Thread.new { a(33) }

  [a31, a32, a33, b3].each(&:join)

  ab3 = "#{collect_sorted([a31.value, a32.value, a33.value])}-#{b3.value}"
  c2.join
  puts "C2 = #{c2}"
  puts "AB3 = #{ab3}"

  c3 = Thread.new { c(ab3) }

  c3.join
  c123 = collect_sorted([c1.value, c2.value, c3.value])
  puts "C3 = #{c3}"
  result = a(c123)
  puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb
end

class ResponseCache
  extend Thread::Local # defines `instance` class method that lazy-creates a separate instance per thread

  def initialize
    @response_cache = {}
    @semaphore_c = Async::Semaphore.new(1, parent: Async::Barrier.new)
  end

  def update(key, value)
    refresh(key, value)
    collect
    c_task

    return @response_cache
  end

  def get
    return @response_cache
  end

  private

  def refresh(key, value)
    @response_cache[key] = value
  end

  def process_ab_keys(response_cache, a_prefix, b_key, ab_key)
    a_keys = (1..3).map { |i| "#{a_prefix}#{i}" }
    if a_keys.all? { |key| response_cache[key] } && response_cache[b_key]
      ab_value = "#{collect_sorted(a_keys.map { |key| response_cache[key] })}-#{response_cache[b_key]}"
      puts "#{ab_key.upcase} = #{ab_value}"
      response_cache[ab_key] = ab_value
      response_cache = response_cache.except(*a_keys, b_key)
    end
    response_cache
  end

  def process_c_keys(response_cache, ab_key, c_key)
    if response_cache[ab_key] && response_cache[c_key]
      puts "#{c_key.upcase} = #{response_cache[c_key]}"
      response_cache = response_cache.except(ab_key)
    end
    response_cache
  end

  def collect
    @response_cache = process_ab_keys(@response_cache, 'a1', 'b1', 'ab1')
    @response_cache = process_ab_keys(@response_cache, 'a2', 'b2', 'ab2')
    @response_cache = process_ab_keys(@response_cache, 'a3', 'b3', 'ab3')

    @response_cache = process_c_keys(@response_cache, 'ab1', 'c1')
    @response_cache = process_c_keys(@response_cache, 'ab2', 'c2')
    @response_cache = process_c_keys(@response_cache, 'ab3', 'c3')
  end

  def c(value)
    puts "https://localhost:9292/c?value=#{value}"
    Faraday.get("https://localhost:9292/c?value=#{value}").body
  end

  def process_ab_and_refresh(response_cache, ab_keys)
    ab_keys.each do |ab_key, c_key|
      if response_cache[ab_key]
        refresh(c_key, c(response_cache[ab_key]))
        collect
      end
    end
  end

  def ab_keys_mapping
    {
    'ab1' => 'c1',
    'ab2' => 'c2',
    'ab3' => 'c3'
  }
  end

  def c_task
    Async do
      @semaphore_c.async do
        process_ab_and_refresh(@response_cache, ab_keys_mapping)
      end
    end
  end
end

def async
  semaphore_a = Async::Semaphore.new(3, parent: Async::Barrier.new)
  semaphore_b = Async::Semaphore.new(2, parent: Async::Barrier.new)

  a_jobs = [11, 12, 13, 21, 22, 23, 31, 32, 33]
  b_jobs = [1,2,3]

  Async do
    Async do
      a_jobs.each do |job|
        semaphore_a.async do
          ResponseCache.instance.update("a#{job}", a(job))
        end
      end
    end

    Async do
      b_jobs.each do |job|
        semaphore_b.async do
          ResponseCache.instance.update("b#{job}", b(job))
        end
      end
    end
  end

  cache = ResponseCache.instance.get
  c123 = collect_sorted([cache['c1'], cache['c2'], cache['c3']])
  result = a(c123)

  puts "RESULT = #{result}" # 0bbe9ecf251ef4131dd43e1600742cfb
end
start = Time.now
# original_implementation
# threads
async

puts "FINISHED in #{Time.now - start}s."


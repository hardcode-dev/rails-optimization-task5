require 'openssl'
require 'typhoeus'

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
def make_request(endpoint, value)
  Typhoeus::Request.new(
    "https://localhost:9292/#{endpoint}",
    method: :get,
    params: { value: value },
    ssl_verifypeer: false,
    timeout: 10
  )
end

def collect_sorted(arr)
  arr.sort.join('-')
end

start = Time.now

hydra = Typhoeus::Hydra.new(max_concurrency: 6)
responses = {}

a_batches = {
  1 => [11, 12, 13].map { |v| make_request('a', v) },
  2 => [21, 22, 23].map { |v| make_request('a', v) },
  3 => [31, 32, 33].map { |v| make_request('a', v) }
}
b_requests = [1, 2, 3].map { |v| make_request('b', v) }

a_batches.each do |batch, reqs|
  reqs.each do |req|
    req.on_complete do |response|
      responses["a#{batch}_#{req.options[:params][:value]}".to_sym] = response.body
    end
  end
end

b_requests.each_with_index do |req, idx|
  req.on_complete do |response|
    responses["b_#{idx + 1}".to_sym] = response.body
  end
end
# Queue first batch
a_batches[1].each { |req| hydra.queue(req) }
[b_requests[0], b_requests[1]].each { |req| hydra.queue(req) }
# Run first batch
hydra.run

# Queue second batch
ab1 = "#{collect_sorted(a_batches[1].map! { |req| responses["a1_#{req.options[:params][:value]}".to_sym] })}-#{responses[:b_1]}"
puts "AB1 = #{ab1}"
c1_req = make_request('c', ab1)
c1_req.on_complete { |response| responses[:c1] = response.body }
hydra.queue(c1_req)

a_batches[2].each { |req| hydra.queue(req) }
hydra.queue(b_requests[2])
# Run second batch
hydra.run

ab2 = "#{collect_sorted(a_batches[2].map! { |req| responses["a2_#{req.options[:params][:value]}".to_sym] })}-#{responses[:b_2]}"
puts "C1 = #{responses[:c1]}"
puts "AB2 = #{ab2}"

# Queue third batch
c2_req = make_request('c', ab2)
c2_req.on_complete { |response| responses[:c2] = response.body }
hydra.queue(c2_req)
a_batches[3].each { |req| hydra.queue(req) }

# Run third batch
hydra.run

puts "C2 = #{responses[:c2]}"
ab3 = "#{collect_sorted(a_batches[3].map! { |req| responses["a3_#{req.options[:params][:value]}".to_sym] })}-#{responses[:b_3]}"
puts "AB3 = #{ab3}"

# Queue fourth batch
c3_req = make_request('c', ab3)
c3_req.on_complete { |response| responses[:c3] = response.body }
hydra.queue(c3_req)

# Run fourth batch
hydra.run

puts "C3 = #{responses[:c3]}"
c123 = collect_sorted([responses[:c1], responses[:c2], responses[:c3]])

# Final processing
final_req = make_request('a', c123)
final_req.on_complete { |response| responses[:final] = response.body }
hydra.queue(final_req)
hydra.run

puts "FINISHED in #{Time.now - start}s."
puts "RESULT = #{responses[:final]}" # 0bbe9ecf251ef4131dd43e1600742cfb

# FINISHED in 7.064975s.
# RESULT = 0bbe9ecf251ef4131dd43e1600742cfb

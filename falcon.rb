#!/usr/bin/env RUBY_YJIT_ENABLE=1 bundle exec falcon-host
# frozen_string_literal: true

load :rack, :supervisor

supervisor

rack 'example.localhost' do
	scheme 'http'
	count 1
	protocol {Async::HTTP::Protocol::HTTP1}
	endpoint do
		Async::HTTP::Endpoint.for(scheme, "localhost", port: 9292, protocol: protocol)
	end

	append preload "preload.rb"
end

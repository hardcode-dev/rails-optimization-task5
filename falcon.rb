#!/usr/bin/env ruby
# frozen_string_literal: true

load :rack, :tls

rack "dev2", :tls do
  endpoint do
    Async::HTTP::Endpoint.for(
      scheme, "localhost",
      port: "4443",
      ssl_context: ssl_context
    )
  end

  ssl_certificate_path { "vendor/nginx/certs/localhost.pem" }
  ssl_private_key_path { "vendor/nginx/certs/localhost.key" }
end

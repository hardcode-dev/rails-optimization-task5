# rubocop:disable Metrics/BlockLength

module Config
  class LocalProductionConfig < ProductionConfig

    def log_level
      :error
    end

    def config_mailer(config)

      config.action_mailer.default_url_options = { host: "localhost:3000" }
      config.action_mailer.delivery_method = :smtp
      config.action_mailer.perform_deliveries = true
      config.action_mailer.default_url_options = { host: config.app_domain }
      config.action_mailer.smtp_settings = {
          address: "smtp.gmail.com",
          port: "587",
          enable_starttls_auto: true,
          user_name: '<%= ENV["DEVELOPMENT_EMAIL_USERNAME"] %>',
          password: '<%= ENV["DEVELOPMENT_EMAIL_PASSWORD"] %>',
          authentication: :plain,
          domain: "localhost:3000"
      }

      config.action_mailer.preview_path = "#{Rails.root}/spec/mailers/previews"

    end

    def call(config)

      #ENV["RAILS_LOG_TO_STDOUT"] ||= "true"
      ENV["SEND_LOGS_TO_TIMBER"] ||= "false"
      ENV["RAILS_SERVE_STATIC_FILES"] ||= "true"
      ENV['APP_PROTOCOL'] ||= 'http'
      ENV['APP_DOMAIN'] ||= 'localhost:3000'
      ENV['SECRET_KEY_BASE'] ||= 'csdvsdljkghsdkjhgfskdjhfgkjsdhgkjsdhgkjdshgkjds'

      super

      pp "LOCAL_PRODUCTION loaded"

      # Use the lowest log level to ensure availability of diagnostic information
      # when problems arise.

      config.app_domain = "localhost:3000"

    end
  end
end

# rubocop:enable Metrics/BlockLength

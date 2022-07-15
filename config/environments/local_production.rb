# rubocop:disable Metrics/BlockLength
#
def yarn_integrity_enabled?
  ENV.fetch("YARN_INTEGRITY_ENABLED", "true") == "true"
end

Rails.application.configure do
  config.webpacker.check_yarn_integrity = false
  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true
  config.cache_store = :memory_store
  config.public_file_server.enabled = true
  config.public_file_server.headers = {
    "Cache-Control" => "public, max-age=172800"
  }
  config.assets.js_compressor = Uglifier.new(harmony: true)
  config.action_mailer.raise_delivery_errors = false
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.assets.compile = true
  config.assets.debug = false
  config.assets.digest = true
  config.assets.quiet = true
  config.assets.raise_runtime_errors = true
  config.log_formatter = ::Logger::Formatter.new
  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger = ActiveSupport::TaggedLogging.new(logger)
  end
  config.action_mailer.perform_caching = false
  config.app_domain = "localhost:3000"
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
  config.log_level = :debug
  config.log_tags = [:request_id]
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
end

# rubocop:enable Metrics/BlockLength

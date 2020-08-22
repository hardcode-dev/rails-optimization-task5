if ENV['CUSTOM_ENVIRONMENT'] == 'local_production'
  Rails.application.configure do
    config.cache_classes = true
    config.eager_load = true
    config.perform_caching = true
    config.assets_debug = false
    config.assets_compile = false
  end
end

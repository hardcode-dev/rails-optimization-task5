
Rails.application.configure do

  if ENV['LOCAL_PRODUCTION']
    Config::LocalProductionConfig.call(config)
  else
    Config::ProductionConfig.call(config)
  end
end


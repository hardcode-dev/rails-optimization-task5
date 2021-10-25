web: RAILS_ENV=local_production PORT=3000 bundle exec puma -C config/puma.rb
worker: bundle exec rake jobs:work

#!/bin/bash
# Interpreter identifier

# Exit on fail
set -e

rm -f $APP_HOME/tmp/pids/server.pid

RAILS_ENV=${RAILS_ENV} DB_ADAPTER=nulldb bundle exec rake assets:precompile
#RAILS_ENV=${RAILS_ENV} bundle exec rake db:setup

exec "$@"

FROM ruby:2.6.3

# Make nodejs and yarn as dependencies
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install dependencies and perform clean-up
RUN apt-get update -qq && apt-get install -y \
   build-essential \
   nodejs \
   yarn \
 && apt-get -q clean \
 && rm -rf /var/lib/apt/lists
ENV APP_HOME /usr/src/app
WORKDIR $APP_HOME
ARG RAILS_ENV

# Installing Ruby dependencies
COPY Gemfile Gemfile.lock ./

RUN bundle check || bundle install --without development test \
    && rm -rf vendor/cache/*.gem

ADD . $APP_HOME

CMD touch tmp/caching-dev.txt

ENV YARN_INTEGRITY_ENABLED "false"
ARG RAILS_ENV
ARG ALGOLIASEARCH_API_KEY
ARG ALGOLIASEARCH_APPLICATION_ID
ARG ALGOLIASEARCH_SEARCH_ONLY_KEY
ARG AWS_ID
ARG AWS_SECRET
ARG AWS_BUCKET_NAME
ARG AWS_REGION

RUN yarn install && yarn check --integrity

CMD bundle exec puma -C config/puma.rb

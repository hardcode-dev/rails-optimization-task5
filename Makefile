.PHONY: run

run:
	docker-compose build && docker-compose run --rm web rails db:setup

setup:
	bin/setup

dev:
	bin/startup

clean:
	bin/rails jobs:clear

up:
	docker-compose up

down:
	docker-compose down
include .env
export COMPOSE_PROJECT_NAME=$(PROJECT_NAME)

setup: docker-sync-install

start: prepare up

sync-start:
	docker-sync start

sync-stop:
	docker-sync stop

sync-restart:
	docker-sync stop
	docker-sync start

prepare:
	# create a volume for the mongo image
	docker volume create $(PROJECT_NAME)-volume
	docker volume create $(PROJECT_NAME)-sync-volume
	# verify volume creation
	docker volume inspect $(PROJECT_NAME)-volume
	docker-compose rm -f
	# pull images from docker hub
	docker-compose pull
	docker-compose build --no-cache

up:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --force-recreate
	@echo the app has been started 🎊 🎉 🎀

status:
	docker-compose ps

down:
	docker-compose down

# install docker sync for local dev
docker-sync-install:
	brew install rsync

build-frontend:
	docker build -t frontend:latest --rm=false ./frontend

clean:
	# these commands are likely to throw errors and stop. hence the - to ignore errors
	-sh ./docker-commands.sh clean-containers
	-sh ./docker-commands.sh clean-iamges-dangling
	-sh ./docker-commands.sh clean-images
	-sh ./docker-commands.sh clean-volumes
	-sh ./docker-commands.sh clean-networks

ssh-$(CONTAINER_NAME_1):
	docker exec -it $(CONTAINER_NAME_1) bash

ssh-$(CONTAINER_NAME_2):
	docker exec -it $(CONTAINER_NAME_2) bash

git:
	# e.g: make git m="Added frontend"
	git add .
	git commit -m "$(m)"
	git push
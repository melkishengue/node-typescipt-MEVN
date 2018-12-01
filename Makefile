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
	# verify voume creation
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

clean:
	# remove containers
	# these commands are likely to fail if the container or the image does not exist. Hence the -
	# -docker rm $(CONTAINER_NAME_1)
	# -docker rm $(CONTAINER_NAME_2)
	# -docker rm $(PROJECT_NAME)_loadbalancer
	# -docker rm $(PROJECT_NAME)_frontend
	# -docker rm mongo
	# # remove images
	# -docker rmi $(PROJECT_NAME)_$(CONTAINER_NAME_1)
	# -docker rmi $(PROJECT_NAME)_$(CONTAINER_NAME_2)
	# -docker rmi $(PROJECT_NAME)_loadbalancer
	# -docker rmi $(PROJECT_NAME)_frontend
	sh ./docker-commands.sh

ssh-node-app-0:
	docker exec -it node-app-0 bash

ssh-node-app-1:
	docker exec -it node-app-1 bash
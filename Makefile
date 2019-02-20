include .env
export COMPOSE_PROJECT_NAME=$(PROJECT_NAME)

start: create-volumes prepare up

start-production: clean create-volumes prepare up-production

sync-start:
	docker-sync start

sync-stop:
	docker-sync stop

sync-restart:
	docker-sync stop
	docker-sync start

create-volumes:
	# create a volume for the mongo image
	docker volume create $(PROJECT_NAME)-volume
	docker volume create $(PROJECT_NAME)-sync-volume
	# verify volume creation
	docker volume inspect $(PROJECT_NAME)-volume
	docker network create web

prepare:
	# remove all containers afterwards 
	# docker-compose rm -f
	# # pull images from docker hub
	# docker-compose pull
	# # docker-compose build --no-cache
	# docker-compose build

prepare-test:
	docker-compose rm -f
	# pull images from docker hub
	docker-compose -f docker-compose-test.yml pull
	docker-compose -f docker-compose-test.yml build --no-cache

up:
	# docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --force-recreate
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
	@echo the app has been started 🎊 🎉 🎀

# this starts the app for production ie without the docker-compose dev file
up-production:
	docker-compose -f docker-compose.yml up --force-recreate -d
	@echo the app has been started 🎊 🎉 🎀

deploy-prepare: kompose-install

deploy:
	env $(cat .env | grep ^[A-Z] | xargs) docker stack deploy --compose-file docker-compose.yml $(PROJECT_NAME)

kompose-install:
	curl -L https://github.com/kubernetes/kompose/releases/download/v1.16.0/kompose-darwin-amd64 -o kompose
	chmod +x kompose
	sudo mv ./kompose /usr/local/bin/kompose

start-kubernetes-dashboard:
	kubectl get pods --namespace=kube-system
	echo "visit https://localhost:8443/#!/service?namespace=kube-system"
	kubectl port-forward kubernetes-dashboard-7b9c7bc8c9-q8nw8 8443:8443 --namespace=kube-system
	# now visit https://localhost:8443/#!/service?namespace=kube-system

status:
	docker-compose ps

down:
	docker-compose down

# install docker sync for local dev
docker-sync-install:
	brew install rsync

build-frontend:
	docker build -t frontend:latest --rm=false ./frontend

test:
	make clean
	make create-volumes
	make prepare-test
	docker-compose -f docker-compose-test.yml -f docker-compose-dev.yml up --force-recreate

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

ssh-frontend:
	docker exec -it frontend-app bash

git:
	# e.g: make git m="Added frontend"
	git add .
	git commit -m "$(m)"
	git push

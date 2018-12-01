#!/bin/bash
# remove all containers
docker rm -f $(docker ps -a -q)

# remove all images. Use with caution, will cause all images to be redownloaded from docker hub on next build
# docker rmi -f $(docker images -a -q)

# remove all external volumes
docker volume rm $(docker volume ls -q)

# remove all networks
docker network rm $(docker network ls | tail -n+2 | awk '{if($2 !~ /bridge|none|host/){ print $1 }}')

# remove all intermadiate images
# equivalent to docker image prune
docker rmi $(docker images -f "dangling=true" -q)
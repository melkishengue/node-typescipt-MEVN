#!/bin/bash

case "$1" in
        clean-containers)
            # remove all containers
            docker rm -f $(docker ps -a -q)
            ;;
        clean-iamges-dangling)
            # remove all intermadiate images
            # equivalent to docker image prune
            docker rmi $(docker images -f "dangling=true" -q)
            ;;
        clean-images)
            # remove all project related images
            docker rmi $(docker image ls | grep node-ts-app)
            ;;
        clean-volumes)
            # remove all external volumes
            docker volume rm $(docker volume ls -q)
            ;;
        clean-networks)
            # remove all networks
            docker network rm $(docker network ls | tail -n+2 | awk '{if($2 !~ /bridge|none|host/){ print $1 }}')
            ;;

        clean-all-images)
            # remove all images. Use with caution, will cause all images to be redownloaded from docker hub on next build
            docker rmi -f $(docker images -a -q)
            ;;
         
        *)
            echo $"Wrong usage of the script"
            exit 1
 
esac
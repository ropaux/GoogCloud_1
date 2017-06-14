#!/bin/bash

# stop all containers
docker stop $(docker ps -a -q)

# remove all images
docker rmi -f $(docker images -a -q)

# remove all containers
docker rm -f $(docker ps -a -q)
#!/bin/zsh

# mkdir -p ./kafka
# curl -sSL https://raw.githubusercontent.com/bitnami/containers/main/bitnami/kafka/docker-compose.yml > kafka/docker-compose.yaml

cd ./kafka
docker-compose stop
docker-compose down

docker volume prune -f

docker-compose up -d
# rm docker-compose.yaml

# add the kafka docker container name to host file.
sudo -- zsh -c 'echo "127.0.0.1 $(docker ps -q -f "name=kafka") # temporary kafka entry" >> /etc/hosts'
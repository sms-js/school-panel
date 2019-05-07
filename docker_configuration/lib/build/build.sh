#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`
SUCCESS=$(docker network ls | grep $NETWORK_NAME 2> /dev/null)

# Khemlabs - Config script #
NGINX_PORT=${NGINX_PORT:-80}
#### WARNING: if you are using NGINX version, this port must not be changed
PORT_APP=${PORT_APP:-3000}

printf "\n${bold}==> ********** OVERWRITING .env FILE **********${normal} \n"
if [ -z "${USE_TEST_API+x}" ] 
then
	printf "\n${bold}==> ********** USING LOCAL API RUNNING IN http://api.whatsapp.local.khem.io **********${normal} \n"
	echo "ENV_APP_FILE_PATH=./docker_configuration/dev.env" > '.env'
else
	echo "ENV_APP_FILE_PATH=./docker_configuration/test.env" > '.env'
fi

echo "PORT_APP=$PORT_APP" >> '.env'
echo ".env file created"


if [ -z "${BIND_HOST+x}" ] 
then
	if [ -z "${NGINX_CONTAINER_NAME+x}" ] 
	then
		NGINX_CONTAINER_NAME="nginx-proxy"
		printf "\n${bold}==> ********** CREATE OR UPDATE NGINX PROXY **********${normal} \n"
		printf "Lifting nginx-proxy container ($NGINX_CONTAINER_NAME) in port $NGINX_PORT (this may take a few minutes, please wait...) \n"
		SUCCESS=$(docker run --name $NGINX_CONTAINER_NAME -d -p $NGINX_PORT:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy 2> /dev/null)
	else
		printf "\n${bold}==> ********** USING NGINX CONTAINER NAME ($NGINX_CONTAINER_NAME) **********${normal} \n"
	fi
	printf "Creating network (whatsapp-panel_app_network) \n"
	SUCCESS=$(docker network create whatsapp-panel_app_network 2> /dev/null)
	printf "Adding network (whatsapp-panel_app_network) to nginx container ($NGINX_CONTAINER_NAME) \n"
	SUCCESS=$(docker network connect whatsapp-panel_app_network $NGINX_CONTAINER_NAME 2> /dev/null)
fi

printf "\n${bold}==> ********** BUILDING AND RUNNING DEV PANEL **********${normal} \n"
docker-compose -p whatsapp-panel -f dev.yml -f docker-compose.yml up -d --build

printf "\n*******************************************************************************************\n"
printf "        YOUR PROJECT WILL BE ACCESSIBLE FROM: http://panel.whatsapp.local.khem.io:$NGINX_PORT\n"
printf "*******************************************************************************************\n"
#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`

printf "\n${bold}==> ********** REMOVING EXISTING CONTAINER **********${normal} \n"
docker rm -vf whatsapp-panel_app_1

printf "\n${bold}==> ********** RECREATING AND RUNNING DEV PANEL **********${normal} \n"
if [ -z "${BIND_HOST+x}" ] 
then
	printf "\n*******************************************************************************************\n"
	printf "        YOUR PROJECT WILL BE ACCESSIBLE FROM: http://panel.whatsapp.local.khem.io:$NGINX_PORT\n"
	printf "*******************************************************************************************\n"
fi

printf "\n${bold}==> ********** BUILDING AND RUNNING DEV PANEL **********${normal} \n"
	docker-compose -p whatsapp-panel -f docker-compose.yml up
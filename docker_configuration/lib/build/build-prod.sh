#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`
SUCCESS=$(docker network ls | grep $NETWORK_NAME 2> /dev/null)

printf "\n${bold}==> ********** USING API RUNNING IN http://api.whatsapp.khem.io (@todo fix SSL) **********${normal} \n"
cp ./docker_configuration/prod.env .env

printf "\n${bold}==> ********** Generating new build **********${normal} \n"
npm run react-build
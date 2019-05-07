#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`
SUCCESS=$(docker network ls | grep $NETWORK_NAME 2> /dev/null)

cp ./docker_configuration/prod.env .env

printf "\n${bold}==> ********** Generating new build **********${normal} \n"
npm run react-build
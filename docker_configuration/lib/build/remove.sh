#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`

printf "\n${bold}==> ********** REMOVING PREVIOUS CONTAINER (whatsapp-panel_app_1) **********${normal} \n"

printf "Removing panel container\n"
SUCCESS=$(docker rm -vf whatsapp-panel_app_1 2> /dev/null)

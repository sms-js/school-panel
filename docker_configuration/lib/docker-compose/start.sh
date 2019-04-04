#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`

# Khemlabs - Config script #

printf "\n${bold}==> ********** RUNNING DEV PANEL **********${normal} \n"
docker start nginx-proxy whatsapp-panel_app_1

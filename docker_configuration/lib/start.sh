#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`

printf "\n${bold}==> ********** PROD MODE **********${normal} \n"

printf "\n${bold}==> START REACT PANEL... ${normal} \n"
forever --minUptime 1000 --spinSleepTime 1000 server.js
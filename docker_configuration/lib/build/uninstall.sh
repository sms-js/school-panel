#!/bin/bash

# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`

sh ./lib/build/remove.sh

printf "\n${bold}==> ********** REMOVING IMAGE (khemlabs/whatsapp-panel) **********${normal} \n"

printf "Removing app image\n"
SUCCESS=$(docker rmi $(docker images |grep 'khemlabs/whatsapp-panel') 2> /dev/null)

if [ -z "${REMOVE_KICKSTARTER+x}" ] 
then
	printf "To remove KICKSTARTER image RUN REMOVE_KICKSTARTER=true npm run uninstall \n"
else
	printf "Removing KICKSTARTER image (khemlabs/kickstarter-client-base)\n"
	SUCCESS=$(docker rmi $(docker images |grep 'khemlabs/kickstarter-client-base') 2> /dev/null)
fi
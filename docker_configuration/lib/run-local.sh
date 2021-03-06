#!/bin/bash

# DO NOT MODIFY

printf "\n${bold}==> ********** OVERWRITING .env FILE **********${normal} \n"
if [ -z "${USE_TEST_API+x}" ] 
then
	printf "\n${bold}==> ********** USING LOCAL API RUNNING IN http://localhost:3001 **********${normal} \n"
	cp ./docker_configuration/local.env .env
else
	cp ./docker_configuration/test.env .env
fi

#printf "\n${bold}==> RUN npm update... ${normal} \n"
#npm update
printf "\n${bold}==> WARNING! npm update is not longer donde, you must first run npm install... ${normal} \n"

npm run react-start
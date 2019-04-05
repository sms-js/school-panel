#!/bin/bash

# DO NOT MODIFY

printf "\n${bold}==> ********** OVERWRITING .env FILE **********${normal} \n"
if [ -z "${USE_TEST_API+x}" ] 
then
	printf "\n${bold}==> ********** USING LOCAL API RUNNING IN http://localhost:3001 **********${normal} \n"
	cp ./docker_configuration/local.env .env
else
	printf "\n${bold}==> ********** USING API RUNNING IN http://api.whatsapp.khem.io (@todo fix SSL) **********${normal} \n"
	cp ./docker_configuration/test.env .env
fi

printf "\n${bold}==> ********** Installing pedendencies **********${normal} \n"
npm update

npm run react-start
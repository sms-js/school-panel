# DO NOT MODIFY

bold=`tput bold`
normal=`tput sgr0`

printf "\n${bold}==> ********** REMOVING DANGLING IMAGES **********${normal} \n"
docker rmi $(docker images --quiet --filter "dangling=true")

printf "\n${bold}==> ********** REMOVING DANGLING VOLUMES **********${normal} \n"
docker volume rm `docker volume ls -q -f dangling=true`
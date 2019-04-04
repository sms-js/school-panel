############################################################
# Dockerfile to build NodeJS 9 Installed Containers
# Based on Node:9.6
############################################################

# base image
FROM node:9.6

EXPOSE 3000

# set working directory
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/build
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install forever -g
RUN npm install express@4.16

# Copy build
COPY ./build /usr/src/app/build
COPY ./package.json /usr/src/app/
COPY ./server.js /usr/src/app/
COPY ./docker_configuration/lib/start.sh /usr/src/app/

# start app
CMD ["npm", "run", "prod-start"]

FROM node
WORKDIR /usr/src/app
COPY . /usr/src/app
#TODO: switch to user with no root permision
RUN npm install
CMD "npm" "start"
FROM node:boron-alpine

RUN mkdir /var/node
WORKDIR /var/node

COPY . /var/node

RUN NODE_ENV=production npm install


CMD [ "npm", "start" ]



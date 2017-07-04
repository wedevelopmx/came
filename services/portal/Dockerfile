# create a file named Dockerfile
FROM node:7-alpine

RUN apk add --no-cache make git

RUN mkdir /portal
WORKDIR /portal

COPY package.json /catalog
RUN npm install pm2 -g
RUN npm install

COPY . /portal

EXPOSE 80

CMD ["pm2-docker", "process.json"]

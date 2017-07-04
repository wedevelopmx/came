# create a file named Dockerfile
FROM node:7-alpine

RUN mkdir /geolocation
WORKDIR /geolocation

COPY package.json /geolocation
RUN npm install pm2 -g
RUN npm install

COPY . /geolocation

EXPOSE 80

CMD ["pm2-docker", "process.json"]

# create a file named Dockerfile
FROM node:7-alpine

RUN apk add --no-cache make git

RUN mkdir /portal
WORKDIR /portal

COPY . /portal

EXPOSE 80

CMD ["npm", "start"]

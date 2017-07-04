# create a file named Dockerfile
FROM node:7-alpine

RUN mkdir /catalog
WORKDIR /catalog

COPY package.json /catalog
RUN npm install

COPY . /catalog

EXPOSE 80

CMD ["npm", "start"]

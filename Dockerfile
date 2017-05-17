# create a file named Dockerfile
FROM node:argon

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY gulpfile.js /app

RUN npm install gulp --g
RUN npm install --only=dev
RUN gulp init
RUN gulp build

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]

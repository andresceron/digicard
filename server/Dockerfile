# FROM node:14 AS build
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install pm2 -g
RUN npm install typescript -g

COPY package*.json ./
COPY tsconfig.json ./
COPY process.json ./
COPY .env ./.env
RUN ls -la
COPY ./src ./src
RUN mkdir -p ./logs

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "pm2:prod"]

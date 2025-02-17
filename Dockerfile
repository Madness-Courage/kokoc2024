FROM node:lts-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3006

CMD ["npm", "start"]

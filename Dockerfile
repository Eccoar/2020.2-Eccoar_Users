FROM node:14-alpine

WORKDIR /app

ADD package.json .

ADD package-lock.json .

RUN npm install

ADD . .

CMD ["npm", "start"]

EXPOSE 5002
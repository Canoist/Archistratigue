FROM node:16-alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

EXPOSE 8000

CMD ["npm","start"]
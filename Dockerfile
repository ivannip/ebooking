FROM node:16 as base
WORKDIR /root/
COPY ./frontend/build/.  ./frontend/build/.

COPY package*.json .
COPY tsconfig.json .
COPY .env .
COPY ./src/. ./src/.
RUN  npm install



EXPOSE 3001
CMD [ "node", "./dist/server.js" ]
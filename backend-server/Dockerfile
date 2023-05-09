FROM node:14

COPY  ./package.json /docker-server/
COPY  ./yarn.lock /docker-server/

WORKDIR /docker-server/

RUN yarn install


COPY . /docker-server/

CMD yarn start:dev



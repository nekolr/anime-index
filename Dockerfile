FROM node:10.15.3-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org \
    && npm run build:linux

EXPOSE 12345

CMD ["npm", "run", "server"]
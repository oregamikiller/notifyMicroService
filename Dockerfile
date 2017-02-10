FROM node:7.5.0
ENV PATH /usr/bin/:$PATH
WORKDIR /notifyMicroService
ADD package.json /notifyMicroService/package.json
RUN npm install --silent \
    && npm cache clean \
    && rm -rf npm*
ADD config.js /notifyMicroService/config.js
ADD config_local.js /notifyMicroService/config_local.js
ADD index.js /notifyMicroService/index.js

EXPOSE 10001

CMD ["node", "index"]

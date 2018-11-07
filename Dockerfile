FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
# VOLUME ["./src/"]
EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD [ "npm", "run", "build" ]
# CMD [ "npm", "start" ]

CMD /wait && npm start

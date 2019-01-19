FROM elasticsearch:5.6.14-alpine

EXPOSE 9200
ENV discovery.type single-node

ENV http.port 9200
ENV http.cors.enabled true
ENV http.cors.allow-origin *
ENV http.cors.allow-headers X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
ENV http.cors.allow-credentials true

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
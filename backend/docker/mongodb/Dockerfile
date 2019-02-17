# The container created by this dockerfile serves only to seed the mongo database
FROM mongo

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait

CMD /wait && mongod --smallfiles
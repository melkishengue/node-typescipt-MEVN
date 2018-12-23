# The container created by this dockerfile serves only to seed the mongo database
FROM mongo

RUN mkdir -p /seed
COPY . /seed

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# connects to the mongo db host and seeds datas
CMD /wait && mongoimport --drop --host ${DB_HOST} --port ${DB_PORT} --db ${DB_NAME} --collection movies --type json --file /seed/movies.json --jsonArray \
    && mongoimport --drop --host ${DB_HOST} --port ${DB_PORT} --db ${DB_NAME} --collection moviedetails --type json --file /seed/movieDetails.json --jsonArray \
    && mongoimport --drop --host ${DB_HOST} --port ${DB_PORT} --db ${DB_NAME} --collection moviescratchs --type json --file /seed/moviesScratch.json --jsonArray \
    && mongoimport --drop --host ${DB_HOST} --port ${DB_PORT} --db ${DB_NAME} --collection reviews --type json --file /seed/reviews.json --jsonArray
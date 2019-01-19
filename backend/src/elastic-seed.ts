import ElasticSearchDatabaseSeeder from './database/ElasticSearchDatabaseSeeder';
import { ConfigOptions } from 'elasticsearch';
import _logger from './logger';
// import { movieService } from './services/movieService';
import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';

let { ELASTIC_HOST, ELASTIC_PORT } = process.env;

let host: string = `${ELASTIC_HOST}:${ELASTIC_PORT}`;

let conf: ConfigOptions = {
    host
}

let databaseConfiguration: IDatabaseConfiguration = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}
  
  MongooseDatabaseProvider.configure(databaseConfiguration).then(async (res) => {
    let { movieService } = (await import('./services/movieService'));

    ElasticSearchDatabaseSeeder.configure(conf)
    .then(async () => {
        console.log('COnnected to elastic search');
        try {
            await ElasticSearchDatabaseSeeder.ping();
            try {
                await ElasticSearchDatabaseSeeder.createIndex('movies');
            } catch(error) {
                console.log(error)
            } finally {

                let bulk: any = [];
                let action = { index: { _index: 'movies', _type: 'movie' } };

                let movies = movieService.findAllMovies().then((movies: any) => {
                    movies.forEach((movie: any) => {
                        console.log(movie);
                        let { uid, title, details } = movie;
                        let m = {
                            title, details, uid 
                        }
        
                        bulk.push(action);
                        bulk.push(m);
                    });
        
                    // console.log(bulk);
                    ElasticSearchDatabaseSeeder.bulk(bulk, action).then((payload: any) => {
                        console.log(payload);
                    }).catch((error) => {
                        console.log(error);
                    });
                });

                
            }
        } catch (error) {
            _logger.debug(error)
        }
    })
    .catch((error: any) => {
        console.log(error);
    })
}).catch((error) => {
_logger.debug(error)
});
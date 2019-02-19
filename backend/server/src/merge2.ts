/* 
    merge script for the old schema
    movies + details -> moviesfull
    it is better to have only one collection for movies and details, to enable queries.
    virtual fields does not allow database level queries, as v.f. are not saved into DB 
*/

import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';
import _logger from './logger';
// let movies = require('./film.imdb.json'); 

_logger.debug('Environment is set to ', process.env.NODE_ENV);

let databaseConfiguration: IDatabaseConfiguration = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

MongooseDatabaseProvider.configure(databaseConfiguration).then(async (res) => {
    let { movieService } = (await import('./services/movieService'));
    let Movie = (await import('./models/movie')).default;

    require('fs').readFileSync(__dirname + '/film.imdb.json', 'utf-8').split(/\r?\n/).forEach(function(line:any){
        try {
            let movie = JSON.parse(line);
            let _movie = new Movie();

            // console.log(movie);
            let details = {
                year: movie.year,
                title: movie.title,
                released: movie.released,
                runtime: movie.runtime,
                countries: movie.countries,
                genres: movie.genres,
                director: movie.director,
                writers: movie.writers,
                actors: movie.actors,
                rated: movie.rated,
                plot: movie.plot,
                poster: movie.poster,
                imdb: movie.imdb,
                tomato: movie.tomato,
                metacritic: movie.metacritic,
                awards: movie.awards
            }

            _movie.details = details;

            _movie.save().then((__movie) => {
                console.log('element ' + __movie.details.title + ' inserted in the database');
            });
        } catch(error) {
            console.log(error);
        }
    })
}).catch((error) => {
  _logger.debug(error)
});
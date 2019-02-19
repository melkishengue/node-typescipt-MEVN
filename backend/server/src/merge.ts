/* 
    merge script for the old schema
    movies + details -> moviesfull
    it is better to have only one collection for movies and details, to enable queries.
    virtual fields does not allow database level queries, as v.f. are not saved into DB 
*/

import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';
import _logger from './logger';

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
    let { movieDetailsService } = (await import('./services/movieDetailsService'));
    let Movie = (await import('./models/movie')).default;
    let MovieDetails = (await import('./models/movieDetails')).default;
    let MovieFull = (await import('./models/moviesFull')).default;

    Movie.find({}, {}).then((movies: any) => {
        movies.forEach(async (movie: any) => {
            let movieFull = new MovieFull();
            let { year, title, imdb, type } = movie;
            console.log(year);

            movieFull.year = year;
            movieFull.imdb = imdb;
            movieFull.title = title;
            movieFull.type = type;

            let details = await MovieDetails.findOne({'imdb.id': movie.imdb});
            if (details) {
                let year2 = details.year;
                let { rated, title, released, runtime, countries, genres, director, writers, actors } = details;
                let { plot, poster, imdb, tomato, metacritic, awards } = details;

                movieFull.details = {};
                movieFull.details.year = year2;
                movieFull.details.title = title;
                movieFull.details.released = released;
                movieFull.details.runtime = runtime;
                movieFull.details.countries = countries;
                movieFull.details.genres = genres;
                movieFull.details.director = director;
                movieFull.details.writers = writers; 
                movieFull.details.actors = actors;
                movieFull.details.plot = plot;
                movieFull.details.poster = poster;
                movieFull.details.imdb = imdb;
                movieFull.details.tomato = tomato;
                movieFull.details.metacritic = metacritic;
                movieFull.details.awards = awards;
            } else {
                movieFull.details = {};
            }

            movieFull.save(); 
        })

    }).catch((error: any) => {
        console.log(error)
    })
}).catch((error) => {
  _logger.debug(error)
});
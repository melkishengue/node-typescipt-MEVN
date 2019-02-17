import Movie from '../models/movie';
import MongooseBaseService from './mongooseBaseService';
import { QueryDataSetting } from './mongooseService.interface';
import { random } from '../utils';

export class MovieService extends MongooseBaseService {

  create(pMovie: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      let post = new Movie(pMovie);
      // TODO: use post and not pPost here. Need casting
      post.save(pMovie).then((dbMovie) => {
        resolve(dbMovie);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }

  async query(query: QueryDataSetting): Promise<any> {
    return await this._execute(Movie, query);
  }

  /* this method is overriding the MongooseBaseService.findAll 
    because this method must do some extra work to add 
    the poster and the plot for each retrieved movie
  */
  async findAllMovies(): Promise<any> {

    let skip = random(1, 1000);

    let queryDataSetting: QueryDataSetting = {
      queryObj: {},
      limit: 10000,
      skip: 0
    };

    let fetched = await this.query(queryDataSetting);
    return fetched;
  }

  async filter(text: String): Promise<any> {

    let queryDataSetting: QueryDataSetting = {
      queryObj: { 'title' : { '$regex' : text, '$options' : 'i' } },
      limit: 50,
      sort: '-details.imdb.rating',
      skip: text === '' ? 211:0
    };

    let fetched = await this.query(queryDataSetting);
    return fetched;
  }
}

export const movieService = new MovieService();
import Movie from '../models/movie';
import MongooseBaseService from './mongooseBaseService';
import { QueryDataSetting } from './mongooseService.interface';

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
}

export const movieService = new MovieService();
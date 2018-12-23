import MovieDetails from '../models/movieDetails';
import MongooseBaseService from './mongooseBaseService';
import { QueryDataSetting } from './mongooseService.interface';

export class MovieDetailsService extends MongooseBaseService {

  async query(query: QueryDataSetting): Promise<any> {
    return await this._execute(MovieDetails, query);
  }

  async laodDetailsById(id: string): Promise<any> {
    let queryDataSetting: QueryDataSetting = {
      queryObj: {"imdb.id": id}
    }

    return await this.query(queryDataSetting);
  }
  
}

export const movieDetailsService = new MovieDetailsService(); 
import Review from '../models/review';
import MongooseBaseService from './mongooseBaseService';
import { QueryDataSetting } from './mongooseService.interface';
import _logger from 'logger';

export class ReviewService extends MongooseBaseService {

  create(pReview: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      let user = new Review(pReview);
      user.save(pReview).then((dbReview) => {
        resolve(dbReview);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }

  async query(query: QueryDataSetting): Promise<any> {
    return await this._execute(Review, query);
  }
}

export const reviewService = new ReviewService();
import User from '../models/user';
import MongooseBaseService from './mongooseBaseService';
import { QueryDataSetting } from './mongooseService.interface';
import _logger from 'logger';

export class UserService extends MongooseBaseService {

  create(pUser: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      let user = new User(pUser);
      user.save(pUser).then((dbUser) => {
        resolve(dbUser);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }

  async query(query: QueryDataSetting): Promise<any> {
    return await this._execute(User, query);
  }
}

export const userService = new UserService();
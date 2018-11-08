import User from '../models/user';
import { Promise } from 'es6-promise';
import MongooseBaseService from './mongooseBaseService';

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

  // TODO: this function should be inherited
  query(queryObj: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      User.find(queryObj).then((dbUsers) => {
        resolve(dbUsers);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }
}

export const userService = new UserService();

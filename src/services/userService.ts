import User from '../models/user';
import { Promise } from 'es6-promise';

export class UserService {
  list() {
    return new Promise<any>((resolve: any, reject: any) => {
      User.find().then((users) => {
        resolve(users);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }

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

  clean() {
    return new Promise<any>((resolve: any, reject: any) => {
      User.remove({}).then(() => {
        console.log()
      }).catch((error: any) => {
        reject(error);
      })
    })
  }
}

export const userService = new UserService();

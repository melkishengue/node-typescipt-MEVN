import axios from 'axios';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';
import _logger from '../logger';
import { AxiosResponse } from 'axios';
import { QueryDataSetting } from '../services/mongooseService.interface';

export  default class MongooseDatabaseSeeder {
  private _base_url: string = 'https://jsonplaceholder.typicode.com';

  async clean() {
    return new Promise((resolve: any, reject: any) => {
      MongooseDatabaseProvider.getConnection().dropDatabase();
      resolve('Database clean done');
    });
  }

  async seed() {
    return new Promise(async (resolve: any, reject: any) => {
      _logger.debug('Database seed starting. Fetching data from', this._base_url);

      Promise.all([
        axios.get(`${this._base_url}/users`), 
        axios.get(`${this._base_url}/posts`)
      ]).then((values) => {

        let users: AxiosResponse<any> = values[0];
        let posts: AxiosResponse<any> = values[1];

        this.seedUsers(users).then((dbUsers) => {
          this.seedPosts(users).then((dbPosts) => {
            resolve('Data seed done');
          }).catch((error) => {
            reject(error);
          });
        });

      });
    });
  }

  // TODO. find the right types and get rid of all these any
  private seedUsers(users: AxiosResponse<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<any>> = [];

      users.data.forEach(async (user: any) => {
        promises.push(userService.create(user));
      });

      Promise.all(promises).then((dbUsers) => {
        dbUsers.forEach((dbUser) => {
          _logger.debug(`+ New user created. ID: ${dbUser._id}`);
        });
        resolve(dbUsers);
      }).catch((error) => {
        reject(error);
      });

    })
  }

  private seedPosts(users: AxiosResponse<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let promises: Array<Promise<any>> = [];

      users.data.forEach((user: any) => {
        promises.push(
          axios.get(`${this._base_url}/posts?userId=${user.id}`)
        );
      });

      Promise.all(promises).then((values) => {
        let toResolve: Array<any> = [];

        values.forEach(async (raw: any) => {
          let userPosts = raw.data;
          let query: QueryDataSetting = {
            queryObj: {
              id: userPosts[0].userId
            }
          };
          
          let author = await userService.query(query);
          userPosts.forEach(async (userPost: any) => {
            userPost.author = author[0]._id;
            let dbPost = await postService.create(userPost);
            toResolve.push(dbPost);
            _logger.debug(`+ New post created. ID: ${dbPost._id}`);
          });
        });
        
        resolve(toResolve);
      });
    })
  }
}

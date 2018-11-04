import axios from 'axios';
import {userService} from '../services/userService';
import {postService} from '../services/postService';
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export  default class MongooseDatabaseSeeder {
  async clean() {
    return new Promise((resolve: any, reject: any) => {
      MongooseDatabaseProvider.getConnection().dropDatabase();
      resolve('Database clean done');
    });
  }

  async seed() {
    return new Promise(async (resolve: any, reject: any) => {

      let base_url = 'https://jsonplaceholder.typicode.com';
      console.log('Database seed starting. Fetching data from', base_url);

      Promise.all([axios.get(`${base_url}/users`), axios.get(`${base_url}/posts`)]).then((values) => {

        let users = values[0];
        users.data.forEach(async (user: any) => {
          let dbUser = await userService.create(user);
          console.log('+ User created. ID: ', dbUser._id);
        });

        // TODO: add relation between users and posts
        let posts = values[1];
        posts.data.forEach(async (post: any) => {
          let dbPost = await postService.create(post);
          console.log('+ Post created. ID: ', dbPost._id);
        });

        resolve('Data seed done');
      });
    });
  }
}

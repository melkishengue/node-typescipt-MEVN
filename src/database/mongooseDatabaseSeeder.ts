import axios from 'axios';
import {userService} from '../services/userService';
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';


export  default class MongooseDatabaseSeeder {
  constructor() {

  }

  async clean() {
    return new Promise((resolve: any, reject: any) => {
      MongooseDatabaseProvider.getConnection().dropDatabase();
      resolve('Database clean done');
    });
  }

  async seed() {
    return new Promise((resolve: any, reject: any) => {
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        // console.log(response.data);
        response.data.forEach(async (user: any) => {
          let dbUser = await userService.create(user);
        });
        resolve('Database seed done');
      })
    });
  }
}

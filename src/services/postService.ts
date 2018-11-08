import Post from '../models/post';
import { Promise } from 'es6-promise';
import MongooseBaseService from './mongooseBaseService';

export class PostService extends MongooseBaseService {

  create(pPost: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      let post = new Post(pPost);
      // TODO: use post and not pPost here. Need casting
      post.save(pPost).then((dbPost) => {
        resolve(dbPost);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }

  async listAllAuthor(id: string) {
    return await this.query({author: id});
  }

  query(queryObj: any) {
    return new Promise<any>((resolve: any, reject: any) => {
      Post.find(queryObj).populate('author').then((dbPosts) => {
        resolve(dbPosts);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }
}

export const postService = new PostService();

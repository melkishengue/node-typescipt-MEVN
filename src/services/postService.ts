import Post from '../models/post';
import { Promise } from 'es6-promise';

export class PostService {
  list() {
    return new Promise<any>((resolve: any, reject: any) => {
      Post.find().then((posts) => {
        resolve(posts);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }

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

  read(id: string) {
    return new Promise<any>((resolve: any, reject: any) => {
      Post.findOne({_id: id}).then((dbPost) => {
        resolve(dbPost);
      }).catch((error: any) => {
        reject(error);
      })
    })
  }
}

export const postService = new PostService();

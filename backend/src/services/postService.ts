import Post from '../models/post';
import MongooseBaseService from './mongooseBaseService';
import { QueryDataSetting } from './mongooseService.interface';


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

  async findAllAuthor(id: string) {
    let queryDataSetting: QueryDataSetting = {queryObj: {author: id}};
    return await this.query(queryDataSetting);
  }

  async query(query: QueryDataSetting): Promise<any> {
    return await this._execute(Post, query);
  }
}

export const postService = new PostService();

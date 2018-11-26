import { IMongooseService, QueryDataSetting } from './mongooseService.interface';
import { Model } from "mongoose";


export default abstract class MongooseBaseService implements IMongooseService {

  async findAll() {
    let queryDataSetting: QueryDataSetting = {queryObj: {}};
    return await this.query(queryDataSetting);
  }

  async find(id: string): Promise<any>{
    let queryDataSetting: QueryDataSetting = {queryObj: {_id: id}};
    return await this.query(queryDataSetting);
  }

  async findRandom(): Promise<any> {
    let skip: number = Math.floor((Math.random() * 100) + 1);
    let queryDataSetting: QueryDataSetting = {queryObj: {}, limit: 1, skip};
    return await this.query(queryDataSetting);
  }

  protected async _execute(model: Model<any>, query: QueryDataSetting): Promise<any>{
    query.limit = query.limit ? query.limit : 0;
    query.sort = query.sort ? query.sort : {field: '_id', order: 1};
    query.skip = query.skip ? query.skip : 0;

    return new Promise<any>((resolve: any, reject: any) => {
      model.find(query.queryObj)
        .limit(query.limit)
        .sort([[query.sort.field, query.sort.order]])
        .skip(query.skip)
        .populate('author')
        .then((records: any) => {
          resolve(records);
        }).catch((error: any) => {
          reject(error);
        })
    })
  }
}

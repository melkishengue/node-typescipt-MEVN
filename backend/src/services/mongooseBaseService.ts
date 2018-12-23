import { IMongooseService, QueryDataSetting } from './mongooseService.interface';
import { Model } from "mongoose";


export default abstract class MongooseBaseService implements IMongooseService {

  // needs to receive queryDataSetting in order to be able to override this method later on.
  // see MovieService
  async findAll(): Promise<any> {
    let queryDataSetting = {queryObj: {}};
    return await this.query(queryDataSetting);
  }

  query(queryDataSetting: QueryDataSetting) {
    return new  Promise((resolve, reject) => {
      resolve('This is a dummy method, to be overriden')
    });
  };

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

    return new Promise<any>((resolve: any, reject: any) => {
      let _query = model.find(query.queryObj);

      if (query.limit) _query.limit(query.limit);
      if (query.sort) _query.sort([[query.sort.field, query.sort.order]]);
      if (query.skip) _query.skip(query.skip);
      if (query.populate) _query = _query.populate(query.populate);

      // needed to return js objects instead of mongoose objects
      _query.lean();

      _query.then((records: any) => {
        // console.log('records', records);
        resolve(records);
      }).catch((error: any) => {
        reject(error);
      });
    })
  }
}

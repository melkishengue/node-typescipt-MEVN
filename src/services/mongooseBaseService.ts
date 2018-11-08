import IMongooseService from './mongooseService.interface';

export default class MongooseBaseService implements IMongooseService{

  async list() {
    return await this.query({});
  }

  async read(id: string) {
    return await this.query({_id: id});
  }
}

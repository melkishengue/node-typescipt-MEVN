export interface IMongooseService {
  findAll(): Promise<any>;
  find(id: string): Promise<any>;
  query(): Promise<any>;
}

export interface QueryDataSetting {
  queryObj: any,
  limit?: number,
  skip?: number,
  sort?: {
    field?: string,
    order?: number
  }
}
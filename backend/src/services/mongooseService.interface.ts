export interface QueryDataSetting {
  queryObj: any,
  limit?: number,
  skip?: number,
  sort?: {
    field?: string,
    order?: number
  }
}

export interface IMongooseService {
  findAll(): Promise<any>;
  find(id: string): Promise<any>;
  query?(query: QueryDataSetting): Promise<any>;
}
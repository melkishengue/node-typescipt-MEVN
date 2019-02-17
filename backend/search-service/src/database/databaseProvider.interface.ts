export interface IDatabaseConfiguration {
  host: string,
  port?: string,
  username?: string,
  password?: string,
  database?: string
}

export interface IDatabaseProvider {
  // configure(databaseConfiguration: DatabaseConfiguration): void;
  // this function should return an object of type connection. But which one ?
  // getConnection(): any;
}

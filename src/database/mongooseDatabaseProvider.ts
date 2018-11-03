import mongoose from 'mongoose';
import { IDatabaseProvider, IDatabaseConfiguration } from './databaseProvider.interface';
import { Promise } from 'es6-promise';
// global.Promise = Promise;

export default class MongooseDatabaseProvider implements IDatabaseProvider {
  private static connection: mongoose.Connection;
  private static databaseConfiguration: IDatabaseConfiguration;

  static configure(databaseConfiguration: IDatabaseConfiguration): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      MongooseDatabaseProvider.databaseConfiguration = databaseConfiguration;
      resolve('Database configured');
    });
  }

  // TODO: make this function return a promise instead
  static getConnection() {
    if (!MongooseDatabaseProvider.databaseConfiguration) throw new Error('Database not configured yet. Please call configure method first.')

    if (MongooseDatabaseProvider.connection) {
      return MongooseDatabaseProvider.connection;
    } else {
      let conf = MongooseDatabaseProvider.databaseConfiguration;
      let url: string = `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.database}`;
      console.log('Connecting to mongodb. Url:', url);
      mongoose.connect(url, {useNewUrlParser: true});

      MongooseDatabaseProvider.connection = mongoose.connection;

      MongooseDatabaseProvider.connection.once("open", () => {
        console.log("Connected to database");
      });

      MongooseDatabaseProvider.connection.on("error", () => {
        console.log("MongoDB connection error. Please make sure MongoDB is running.");
        process.exit();
      });

      return MongooseDatabaseProvider.connection;
    }
  }
}

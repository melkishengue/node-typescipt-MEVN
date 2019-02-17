import mongoose from 'mongoose';
import { IDatabaseProvider, IDatabaseConfiguration } from './databaseProvider.interface';
import _logger from '../logger';

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
      _logger.debug(`Connecting to mongoDB on host ${conf.host}`);

      mongoose.set('debug', process.env.NODE_ENV == 'DEV');
      mongoose.connect(url, {useNewUrlParser: true});
      MongooseDatabaseProvider.connection = mongoose.connection;

      MongooseDatabaseProvider.connection.once("open", () => {
        _logger.debug("Connected to mongoDB database");
      });

      MongooseDatabaseProvider.connection.on("error", () => {
        _logger.debug("MongoDB connection error. Please make sure MongoDB is running.");
        // let node exit gracefully
        process.exitCode = 1;
      });

      return MongooseDatabaseProvider.connection;
    }
  }
}

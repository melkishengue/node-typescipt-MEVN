import mongoose from 'mongoose';
import { DatabaseProvider, DatabaseConfiguration } from './databaseProvider';

export class MongooseDatabaseProvider implements DatabaseProvider {
  private static connection: mongoose.Connection;
  private static databaseConfiguration: DatabaseConfiguration;

  static configure(databaseConfiguration: DatabaseConfiguration) {
    MongooseDatabaseProvider.databaseConfiguration = databaseConfiguration;
  }

  static getConnection() {
    if (MongooseDatabaseProvider.connection) {
      return MongooseDatabaseProvider.connection;
    } else {

      let conf = MongooseDatabaseProvider.databaseConfiguration;
      let url: string = `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.database}`;
      console.log('Connecting to mongodb. Url:', url);
      mongoose.connect(url, {useNewUrlParser: true});

      MongooseDatabaseProvider.connection = mongoose.connection;

      MongooseDatabaseProvider.connection.once("open", () => {
        console.log("Database started");
      });

      MongooseDatabaseProvider.connection.on("error", () => {
        console.log("MongoDB connection error. Please make sure MongoDB is running.");
        process.exit();
      });
    }
  }
}

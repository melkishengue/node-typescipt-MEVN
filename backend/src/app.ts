import Server from './server/server';
import IController from './controllers/controller.interface';
import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';
import { Request, Response } from "express";
import _logger from './logger';
import bodyParser from 'body-parser';

_logger.debug('Environment is set to ', process.env.NODE_ENV);

let databaseConfiguration: IDatabaseConfiguration = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

MongooseDatabaseProvider.configure(databaseConfiguration).then(async (res) => {
  // controllers and the database seeder use models, so we need to load them after database initialization
  let controllers = (await import('./controllers/')).default;

  let server = new Server(+process.env.SERVER_PORT || 3000);

  server.addMiddleware(bodyParser.json());
  server.addMiddleware((req: Request, res: Response, next: Function) => {
    _logger.debug(`${process.env.HOST}: ${req.method} ${req.url}`);
    next();
  });

  controllers.forEach((controller: IController) => {
    server.addController(controller);
  });

  server.start();
}).catch((error) => {
  _logger.debug(error)
});

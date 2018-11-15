import Server from './server/server';
import IController from './controllers/controller.interface';
import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';
import { Request, Response } from "express";
import * as express from "express";
import logger from './logger';
import bodyParser from 'body-parser';
import { join } from 'path';
import { hostname } from 'os';

let host = hostname();

// make logger global for all modules
global.logger = logger;

logger.debug('Environment is set to ', process.env.NODE_ENV);

let config_file = process.env.NODE_ENV === 'PROD' ? './.env' : './.env_dev';
require('dotenv').config({ path: config_file });

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
  const MongooseDatabaseSeeder = (await import('./database/mongooseDatabaseSeeder')).default;

  let server = new Server(+process.env.SERVER_PORT || 3000);

  server.addMiddleware(bodyParser.json());

  server.addMiddleware((req: Request, res: Response, next: Function) => {
    logger.debug(`${host}: ${req.method} ${req.url}`);
    next();
  });

  server.addMiddleware(express.static(join(__dirname + '/../', 'public')));

  controllers.forEach((controller: IController) => {
    server.addController(controller);
  });

  if (process.env.ROLE === 'MASTER') {
    let seeder = new MongooseDatabaseSeeder();
    await seeder.clean();
    await seeder.seed();
  }

  server.start();
});

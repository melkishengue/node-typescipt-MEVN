import Server from './server/server';
import IController from './controllers/controller.interface';
import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';
import { Request, Response } from "express";
import * as express from "express";
import _logger from './logger';
import bodyParser from 'body-parser';
import { join } from 'path';
import auth from 'basic-auth';
import { check, loadEnvFile } from './utils';
import createError from 'http-errors';
const exphbs = require('express-handlebars'); 

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
  const MongooseDatabaseSeeder = (await import('./database/mongooseDatabaseSeeder')).default;

  let server = new Server(+process.env.SERVER_PORT || 3000);

  server.config('view engine', 'handlebars');
  server.config('views', join(__dirname, '../src/views'));
  server.setEngine('handlebars', exphbs());

  // basic auth middleware
  // server.addMiddleware((req: Request, res: Response, next: Function) => {
  //   var credentials = auth(req);

  //   if (!credentials || !check(credentials.name, credentials.pass)) {
  //     res.statusCode = 401;
  //     res.setHeader('WWW-Authenticate', 'Basic realm="example"');
  //     res.end('Access denied');
  //   } else {
  //     next();
  //   }
  // });

  server.addMiddleware(bodyParser.json());
  server.addMiddleware((req: Request, res: Response, next: Function) => {
    _logger.debug(`${process.env.HOST}: ${req.method} ${req.url}`);
    next();
  });
  server.addMiddleware(express.static(join(__dirname + '/../', 'frontend/dist')));

  // server.addMiddleware((req: Request, res: Response, next: Function) => {
    // next(createError(404));
  // });

  controllers.forEach((controller: IController) => {
    server.addController(controller);
  });

  if (process.env.ROLE === 'MASTER') {
    let seeder = new MongooseDatabaseSeeder();
    await seeder.clean();
    await seeder.seed();
  }

  server.start();
}).catch((error) => {
  _logger.debug(error)
});

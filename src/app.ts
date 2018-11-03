import Server from './server/server';
import { Request, Response, Router } from "express";
import IController from './controllers/controller.interface';
import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';

require('dotenv').config();

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

  let server = new Server(3000);

  controllers.forEach((controller: IController) => {
    server.addController(controller);
  });

  let seeder = new MongooseDatabaseSeeder();
  await seeder.clean();
  await seeder.seed();

  server.start();
});

import Server from './server/server';
import { Request, Response, Router } from "express";
import { DatabaseConfiguration } from './database/databaseProvider';
import { MongooseDatabaseProvider } from './database/mongooseDatabaseProvider';

require('dotenv').config();

let databaseConfiguration: DatabaseConfiguration = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

MongooseDatabaseProvider.configure(databaseConfiguration);
let conn = MongooseDatabaseProvider.getConnection();

let server = new Server(3000);
server.get('/', (req: Request, res: Response) => {
  res.send('Hello from express');
})
server.start();

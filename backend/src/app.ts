import Server from './server/server';
import IController from './controllers/controller.interface';
import IMiddleware from './middlewares/middleware.interface';
import { IDatabaseConfiguration } from './database/databaseProvider.interface';
import MongooseDatabaseProvider from './database/mongooseDatabaseProvider';
import _logger from './logger';

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
  let middlewares = (await import('./middlewares/')).default;

  let server = new Server(+process.env.SERVER_PORT || 3000);
  
  middlewares.forEach((middleware: IMiddleware) => {
    server.addMiddleware(middleware);
  });

  controllers.forEach((controller: IController) => {
    server.addController(controller);
  });

  server.start().then((message) => {
    _logger.debug(message);
  }).catch((err: Error) => {
    _logger.debug(`Server could not be started on port ${server.getPort()}`);
    _logger.error(err);
    process.exitCode = 1;
  });
}).catch((error) => {
  _logger.debug(error)
});
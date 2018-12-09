import Server from '../server/server';
import IMiddleware from './middleware.interface';
import bodyParser from 'body-parser';

export default class BodyParserMiddleware implements IMiddleware {
  private _baseUrl = '/';

  init(server: Server): void {
    server.middleware(this._baseUrl, bodyParser.json());
  }
}
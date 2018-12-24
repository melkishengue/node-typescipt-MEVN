import Server from '../server/server';
import IController from './controller.interface';
import cors  from 'cors';


export default class Cors implements IController {
  private _baseUrl = '*';

  init(server: Server): void {
    // as long as nginx is used, this config is enough, because cors config has been done at the nginx level
    // a better cors conf will be needed before deployment to kubernetes
    server.options(this._baseUrl, cors());
  }
}
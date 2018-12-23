import Server from '../server/server';
import IController from './controller.interface';
import cors  from 'cors';


export default class Cors implements IController {
  private _baseUrl = '*';

  init(server: Server): void {
    server.options(this._baseUrl, cors());
  }
}
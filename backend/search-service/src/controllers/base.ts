import Server from '../server/server';
import { Request, Response } from "express";
import IController from './controller.interface';

export default class BaseController implements IController {
  private _baseUrl: string = '';

  init(server: Server): void {
    server.get(`${this._baseUrl}/`, this.index.bind(this));
  }

  async index(req: Request, res: Response) {
    res.render('welcome to the search service v1');
  }
}

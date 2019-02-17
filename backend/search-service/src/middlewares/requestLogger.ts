import Server from '../server/server';
import IMiddleware from './middleware.interface';
import { Request, Response } from "express";
import _logger from '../logger';

export default class RequestLogger implements IMiddleware {
  private _baseUrl = '/';
  
  init(server: Server): void {
    server.middleware(this._baseUrl, (req: Request, res: Response, next: Function) => {
      _logger.debug(`${process.env.HOST}: ${req.method} ${req.url}`);
      next();
    }, true, 'requestLogger');
  }
}
import Server from '../server/server';
import IMiddleware from './middleware.interface';
import { Request, Response } from "express";
import _logger from '../logger';
import cors  from 'cors';

export default class Cors implements IMiddleware {
  private _baseUrl = '/';
  
  init(server: Server): void {
    server.middleware(this._baseUrl, (req: Request, res: Response, next: Function) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if ('OPTIONS' == req.method) {
        res.sendStatus(200);
        }
        else {
            next();
        }
    }, true, 'cors');
  }
}
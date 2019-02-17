import express from 'express';
import IController from '../controllers/controller.interface';
import _logger from '../logger';
import IMiddleware from '../middlewares/middleware.interface';

export interface IServer {
  get(url: string, handler: express.Router): void;
  post(url: string, handler: express.Router): void;
  put(url: string, handler: express.Router): void;
  delete(url: string, handler: express.Router): void;
  start(): void;
  middleware(url: string, fn: express.RequestHandler, onRoot: boolean, name: string): void;
}

export default class Server implements IServer {
  protected app: express.Application;
  private port: number;
  private baseUrl: String = "/server/api";

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  getApp(): express.Application {
    return this.app;
  }

  setApp(app: express.Application) {
    this.app = app;
  }

  getPort(): number {
    return this.port;
  }

  get(url: string, handler: express.RequestHandler) {
    this.addRoute('get', `${this.baseUrl}${url}`, handler, undefined);
  }

  post(url: string, handler: express.RequestHandler) {
    this.addRoute('post', `${this.baseUrl}${url}`, handler, undefined);
  }

  put(url: string, handler: express.RequestHandler) {
    this.addRoute('put', `${this.baseUrl}${url}`, handler, undefined);
  }

  delete(url: string, handler: express.RequestHandler) {
    this.addRoute('delete', `${this.baseUrl}${url}`, handler, undefined);
  }

  options(url: string, handler: express.RequestHandler) {
    this.addRoute('options', `${this.baseUrl}${url}`, handler, undefined);
  }

  middleware(url: string, fn: express.RequestHandler, onRoot: boolean, name: String) {
    let _url: string = onRoot ? "*" : `${this.baseUrl}${url}`;
    this.addRoute('use', _url, fn, name);
  }

  private addRoute(method: string, url: string, handler: express.RequestHandler, name: String) {
    (this.app as any)[method](url, handler);
    let type = method === 'use' ? `middleware ${name}` : 'route';
    _logger.debug(`New ${type} added at ${method} ${url}`);
  }

  start(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.app.listen(this.port, (err: Error) => {
        if (err) reject(err);
        resolve(`Server started on port ${this.port}`);
      })
    })
  }

  addController(controller: IController) {
    controller.init(this);
  }

  addMiddleware(middleware: IMiddleware) {
    middleware.init(this);
  }

  config(key: string, value: string): void{
    this.app.set(key, value);
  }

  setEngine(name: string, init: Function) {
    this.app.engine(name, init);
  }
}

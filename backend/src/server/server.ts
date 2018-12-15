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
  middleware(url: string, fn: express.RequestHandler): void;
}

export default class Server implements IServer {
  protected app: express.Application;
  private port: number;

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

  get(url: string, handler: express.RequestHandler) {
    this.addRoute('get', url, handler);
  }

  post(url: string, handler: express.RequestHandler) {
    this.addRoute('post', url, handler);
  }

  put(url: string, handler: express.RequestHandler) {
    this.addRoute('put', url, handler);
  }

  delete(url: string, handler: express.RequestHandler) {
    this.addRoute('delete', url, handler);
  }

  middleware(url: string, fn: express.RequestHandler) {
    this.addRoute('use', url, fn);
  }

  private addRoute(method: string, url: string, handler: express.RequestHandler) {
    (this.app as any)[method](url, handler);
    let type = method === 'use' ? 'middleware' : 'route';
    _logger.debug(`New ${type} added at ${method} ${url}`);
  }

  start(): void {
    this.app.listen(this.port, () => {
      _logger.debug(`server started on port ${this.port}`);
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

import express from 'express';
import IController from '../controllers/controller.interface';

export interface IServer {
  get(url: string, handler: express.Router): void;
  post(url: string, handler: express.Router): void;
  put(url: string, handler: express.Router): void;
  delete(url: string, handler: express.Router): void;
  start(): void;
}

export default class Server implements IServer {
  protected app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
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

  private addRoute(method: string, url: string, handler: express.RequestHandler) {
    (this.app as any)[method](url, handler);
    logger.debug(`New routed added at ${method} ${url}`);
  }

  start(): void {
    this.app.listen(this.port, () => {
      logger.debug(`server started on port ${this.port}`);
    })
  }

  addController(controller: IController) {
    controller.init(this);
  }

  addMiddleware(fn: any) {
    this.app.use(fn);
  }
}

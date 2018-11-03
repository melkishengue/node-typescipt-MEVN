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
    console.log('addRoute', url);
    (this.app as any)[method](url, handler);
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`server started on port ${this.port}`);
    })
  }

  addController(controller: IController) {
    console.log(controller)
    controller.init(this);
  }
}

import express from 'express';
import IController from '../controllers/controller.interface';
import _logger from '../logger';
import IMiddleware from '../middlewares/middleware.interface';

/** A contract for an [Express] server. */
export interface IServer {
  get(url: string, handler: express.Router): void;
  post(url: string, handler: express.Router): void;
  put(url: string, handler: express.Router): void;
  delete(url: string, handler: express.Router): void;
  start(): void;
  middleware(url: string, fn: express.RequestHandler, onRoot: boolean, name: string): void;
}
/** Class representing an http server. */
export default class Server implements IServer {
  protected app: express.Application;
  private port: number;
  private baseUrl: String = "/api";

  /**
   * Create a server
   * @param {number} port - The port to listen to
   */
  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  /**
   * Returs the express app object
   * @return {express.Application} - the express app object
   */
  getApp(): express.Application {
    return this.app;
  }

  /**
   * Sets the express app object
   * @param {express.Application} - the express app object
   */
  setApp(app: express.Application) {
    this.app = app;
  }

  /**
   * Returs the server port
   * @return {number} - the server port
   */
  getPort(): number {
    return this.port;
  }

  /**
   * Defines a handler for a get url
   * @param {string} - the url to listen to 
   * @param {express.RequestHandler} - handler
   */
  get(url: string, handler: express.RequestHandler) {
    this.addRoute('get', `${this.baseUrl}${url}`, handler, undefined);
  }

  /**
   * Defines a handler for a post url
   * @param {string} - the url to listen to 
   * @param {express.RequestHandler} - handler
   */
  post(url: string, handler: express.RequestHandler) {
    this.addRoute('post', `${this.baseUrl}${url}`, handler, undefined);
  }

  /**
   * Defines a handler for a put url
   * @param {string} - the url to listen to 
   * @param {express.RequestHandler} - handler
   */
  put(url: string, handler: express.RequestHandler) {
    this.addRoute('put', `${this.baseUrl}${url}`, handler, undefined);
  }

  /**
   * Defines a handler for a delete url
   * @param {string} - the url to listen to 
   * @param {express.RequestHandler} - handler
   */
  delete(url: string, handler: express.RequestHandler) {
    this.addRoute('delete', `${this.baseUrl}${url}`, handler, undefined);
  }

  /**
   * Defines a handler for a options url
   * @param {string} - the url to listen to 
   * @param {express.RequestHandler} - handler
   */
  options(url: string, handler: express.RequestHandler) {
    this.addRoute('options', `${this.baseUrl}${url}`, handler, undefined);
  }

  /**
   * Defines a middleware
   * @param {string} - the url to listen to 
   * @param {express.RequestHandler} - handler
   * @param {boolean} - whether or not the handler should be added for every route (*)
   * @param {string} - name of the middleware for logging purposes
   */
  middleware(url: string, fn: express.RequestHandler, onRoot: boolean, name: String) {
    let _url: string = onRoot ? "*" : `${this.baseUrl}${url}`;
    this.addRoute('use', _url, fn, name);
  }

  /**
   * Defines route
   * @param {string} - the method: GET/POST/DELETE/PUT/OPTIONS
   * @param {string} - the url to add a route for
   * @param {express.RequestHandler} - handler
   * @param {string} - name of the middleware for logging purposes
   */
  private addRoute(method: string, url: string, handler: express.RequestHandler, name: String) {
    if (method === 'use') {
      (this.app as any)[method](handler);
    }
    else (this.app as any)[method](url, handler);
    
    let type = method === 'use' ? `middleware ${name}` : 'route';
    _logger.debug(`New ${type} added at ${method} ${url}`);
  }

  /**
   * Starts the server
   * @return {Promise<string>} - message 
   */
  start(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.app.listen(this.port, (err: Error) => {
        if (err) reject(err);
        resolve(`Server started on port ${this.port}`);
      })
    })
  }

  /**
   * Adds a controller to the server
   * @param {Icontroller} - the controller to be added
   */
  addController(controller: IController) {
    controller.init(this);
  }

  /**
   * Adds a middleware to the server
   * @param {IMiddleware} - the middleware to be added
   */
  addMiddleware(middleware: IMiddleware) {
    middleware.init(this);
  }

  /**
   * Adds a config key to the server
   * @param {string} - the key
   * @param {string} - the value
   */
  config(key: string, value: string): void {
    this.app.set(key, value);
  }

  /**
   * Defines the engine for the server
   * @param {string} - the engine name
   * @param {Function} - the init function
   */
  setEngine(name: string, init: Function) {
    this.app.engine(name, init);
  }
}

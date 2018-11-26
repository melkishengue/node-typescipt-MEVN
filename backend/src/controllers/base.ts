import Server from '../server/server';
import { Request, Response } from "express";
import IController from './controller.interface';
import MongooseDatabaseStreamer from '../database/mongooseDatabaseStreamer';

export default class BaseController implements IController {
  private _baseUrl: string = '';
  private _stream: MongooseDatabaseStreamer = new MongooseDatabaseStreamer();

  init(server: Server): void {
    server.get(`${this._baseUrl}/`, this.index.bind(this));
    server.get(`${this._baseUrl}/stream`, this.stream.bind(this));
  }

  async index(req: Request, res: Response) {
    res.render('index');
  }

  async stream(req: Request, res: Response) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    this._stream.on('data', (data: Buffer) => {
      res.write("event: data\n" + "data: " + JSON.stringify(data) + "\n\n");
    })
  }
}

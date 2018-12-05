import Server from '../server/server';
import { Request, Response } from "express";
import { movieService } from '../services/movieService';
import IController from './controller.interface';

export default class UserController implements IController {
  private baseUrl: string = '/movies';

  init(server: Server): void {
    server.get(this.baseUrl, this.list.bind(this));
    server.get(`${this.baseUrl}/:id`, this.read.bind(this));
  }

  async read(req: Request, res: Response) {
    let id = req.params.id;
    let user = await movieService.find(id);

    if (user) res.send(user);
    else res.status(404).send('Movie not found');
  }

  async list(req: Request, res: Response) {
    let users = await movieService.findAll();
    res.send(users);
  }
}

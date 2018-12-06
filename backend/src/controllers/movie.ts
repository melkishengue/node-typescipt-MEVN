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
    let movie = await movieService.find(id);

    if (movie) res.send(movie);
    else res.status(404).send('Movie not found');
  }

  async list(req: Request, res: Response) {
    let movies = await movieService.findAll();
    res.send(movies);
  }
}

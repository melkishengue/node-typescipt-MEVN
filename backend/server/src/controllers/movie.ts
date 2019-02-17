import Server from '../server/server';
import { Request, Response } from "express";
import { movieService } from '../services/movieService';
import { movieDetailsService } from '../services/movieDetailsService';
import IController from './controller.interface';
import { QueryDataSetting } from '../services/mongooseService.interface';

export default class MovieController implements IController {
  private baseUrl: string = '/movies';

  init(server: Server): void {
    server.get(this.baseUrl, this.list.bind(this));
    server.get(`${this.baseUrl}/:id`, this.read.bind(this));
  }

  async read(req: Request, res: Response) {
    let id = req.params.id;
    
    let details = await movieDetailsService.laodDetailsById(id);

    if (details) res.send(details);
    else res.status(404).send('Movie not found');
  }

  async list(req: Request, res: Response) {
    let movies = await movieService.findAllMovies();
    
    movies = movies.filter((movie: any) => {
      return movie.details.length === 1;
    });

    res.send(movies);
  }
}

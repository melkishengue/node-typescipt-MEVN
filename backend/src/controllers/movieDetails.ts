import Server from '../server/server';
import { Request, Response } from "express";
import { movieDetailsService } from '../services/movieDetailsService';
import IController from './controller.interface';
import { QueryDataSetting } from '../services/mongooseService.interface';

export default class MovieDetailsController implements IController {
  private baseUrl: string = '/movies';

  init(server: Server): void {
    server.get(`${this.baseUrl}/:id`, this.read.bind(this));
  }

  async read(req: Request, res: Response) {
    let id = req.params.id;
    let queryDataSetting: QueryDataSetting = {
        queryObj: {'imdb': {id}},
        limit: 1
    }
    let details = await movieDetailsService.query(queryDataSetting); 

    if (details) res.send(details);
    else res.status(404).send('Movie not found');
  }
}

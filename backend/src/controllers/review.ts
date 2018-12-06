import Server from '../server/server';
import { Request, Response } from "express";
import { reviewService } from '../services/reviewService';
import IController from './controller.interface';

export default class PostController implements IController {
  private baseUrl: string = '/reviews';
  
  init(server: Server): void {
    server.get(this.baseUrl, this.listAll.bind(this));
    server.get(`${this.baseUrl}/:id`, this.read.bind(this));
  }

  async read(req: Request, res: Response) {
    let id = req.params.id;
    let review = await reviewService.find(id);

    if (review) res.send(review);
    else res.status(404).send('Review not found');
  }

  async listAll(req: Request, res: Response) {
    let reviews = await reviewService.findAll();
    res.send(reviews);
  }
}

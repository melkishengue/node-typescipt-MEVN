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
    let post = await reviewService.find(id);

    if (post) res.send(post);
    else res.status(404).send('Post not found');
  }

  async listAll(req: Request, res: Response) {
    let posts = await reviewService.findAll();
    res.send(posts);
  }
}

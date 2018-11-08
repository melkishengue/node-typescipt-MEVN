import Server from '../server/server';
import { Request, Response } from "express";
import { postService } from '../services/postService';
import IController from './controller.interface';

export default class PostController implements IController {
  init(server: Server): void {
    server.get('/posts', this.listAll.bind(this));
    server.get('/posts/:id', this.read.bind(this));
    server.get('/posts/author/:id', this.listAllAuthor.bind(this));
  }

  async read(req: Request, res: Response) {
    let id = req.params.id;
    let post = await postService.read(id);

    if (post) res.send(post);
    else res.status(404).send('Post not found');
  }

  async listAllAuthor(req: Request, res: Response) {
    let id = req.params.id;
    let posts = await postService.listAllAuthor(id);

    if (posts) res.send(posts);
    else res.status(404).send('Post not found');
  }

  async listAll(req: Request, res: Response) {
    let posts = await postService.list();
    res.send(posts);
  }
}

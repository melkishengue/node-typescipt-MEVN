import Server from '../server/server';
import { Request, Response } from "express";
import { userService } from '../services/userService';
import IController from './controller.interface';

export default class UserController implements IController {
  private baseUrl: string = '/users';

  init(server: Server): void {
    server.get(this.baseUrl, this.list.bind(this));
    server.get(`${this.baseUrl}/:id`, this.read.bind(this));
  }

  async read(req: Request, res: Response) {
    let id = req.params.id;
    let user = await userService.find(id);

    if (user) res.send(user);
    else res.status(404).send('User not found');
  }

  async list(req: Request, res: Response) {
    let users = await userService.findAll();
    res.send(users);
  }
}

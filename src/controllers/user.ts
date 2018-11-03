import Server from '../server/server';
import { Request, Response } from "express";
import { userService } from '../services/userService';
import IController from './controller.interface';

export default class UserController implements IController {
  init(server: Server): void {
    server.get('/users', this.list.bind(this));
  }

  async list(req: Request, res: Response) {
    // TODO: use the user service to get the list of users and send back
    let users = await userService.list();
    res.send(users)
  }
}

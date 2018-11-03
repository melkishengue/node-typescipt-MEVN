import { IServer } from '../server/server';

export default interface IController {
  init(server: IServer): void;
}

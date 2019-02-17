import { IServer } from '../server/server';

// Contract for all controllers
export default interface IController {
  init(server: IServer): void;
}
import { IServer } from '../server/server';

// Contract for all controllers
export default interface IMiddleware {
    init(server: IServer): void;
  }
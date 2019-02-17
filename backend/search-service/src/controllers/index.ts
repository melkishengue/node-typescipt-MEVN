import SearchController from './search';
import BaseController from './base';
import Cors from './cors';

export default [
  new Cors(),
  new SearchController(),
  new BaseController()
];
import BodyParser from './bodyParser';
import RequestLogger from './requestLogger';
import Graphql from './graphql';
import Cors from './cors';

export default [
  // cors first for efficiency
  new Cors(),
  new BodyParser(),
  new RequestLogger(),
  new Graphql()
];
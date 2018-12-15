import BodyParser from './bodyParser';
import RequestLogger from './requestLogger';
import Graphql from './graphql';

export default [
  new BodyParser(),
  new RequestLogger(),
  new Graphql()
];
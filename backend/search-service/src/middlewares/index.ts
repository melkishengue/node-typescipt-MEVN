import BodyParser from './bodyParser';
import RequestLogger from './requestLogger';

export default [
  new BodyParser(),
  new RequestLogger()
];
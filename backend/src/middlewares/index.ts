import BodyParserMiddleware from './bodyParser';
import requestLoggerMiddleware from './requestLoggerMiddleware';
import GraphqlMiddleware from './graphql';

export default [
  new BodyParserMiddleware(),
  new requestLoggerMiddleware(),
  new GraphqlMiddleware()
];
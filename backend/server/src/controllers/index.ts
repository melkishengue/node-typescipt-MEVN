import MovieController from './movie';
import ReviewController from './review';
import SwaggerController from './swagger';
import BaseController from './base';
// import Cors from './cors';

export default [
  // new Cors(),
  new MovieController(),
  new ReviewController(),
  new BaseController(),
  new SwaggerController()
];
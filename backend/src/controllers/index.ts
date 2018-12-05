import MovieController from './movie';
import ReviewController from './review';
import SwaggerController from './swagger';
import BaseController from './base';

export default [
  new MovieController(),
  new ReviewController(),
  new BaseController(),
  new SwaggerController()
];
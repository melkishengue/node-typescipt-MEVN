import UserController from './user';
import PostController from './post';
import SwaggerController from './swagger';
import BaseController from './base';

export default [
  new UserController(),
  new PostController(),
  new BaseController(),
  new SwaggerController()
]

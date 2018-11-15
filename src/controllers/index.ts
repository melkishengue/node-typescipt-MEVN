import UserController from './user';
import PostController from './post';
import SwaggerController from './swagger';

export default [
  new UserController(),
  new PostController(),
  new SwaggerController()
]

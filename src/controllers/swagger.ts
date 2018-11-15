import Server from '../server/server';
import { Request, Response } from "express";
import IController from './controller.interface';
const swaggerJSDoc = require('swagger-jsdoc');

export default class SwaggerController implements IController {
  init(server: Server): void {
    server.get('/swagger.json', this.swagger.bind(this));
  }

  async swagger(req: Request, res: Response) {

    let swaggerDefinition = {
      info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
      },
      host: 'localhost:3000',
      basePath: '/',
    };

    let options = {
      swaggerDefinition: swaggerDefinition,
      apis: ['./**/controllers/*.js']
    };

    let swaggerSpec = swaggerJSDoc(options);

    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  }
}

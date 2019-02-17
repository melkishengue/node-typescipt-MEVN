import Server from '../server/server';
import { Request, Response } from "express";
import { movieService } from '../services/movieService';
import IController from './controller.interface';
import Movie from '../models/movie';
import Fuse from 'fuse.js';

export default class SearchController implements IController {
  private baseUrl: string = '/search';
  private fuseRef: any;
  private fuseOptions: any;
  private searchData: any;
  private filterDetails: object;

  constructor() {
    let nbElements = 6;
    this.fuseOptions = {
      threshold: 0.9,
      shouldSort: true,
      keys: [
        {
          name: 'details.title',
          weight: 0.4
        }, 
        {
          name: 'details.actors',
          weight: 0.2
        }, 
        // {
        //   name: 'details.director',
        //   weight: 0.1
        // }, 
        // {
        //   name: 'details.author',
        //   weight: 0.1
        // }, 
        // {
        //   name: 'details.plot',
        //   weight: 0.1
        // }, 
        {
          name: 'details.year',
          weight: 0.4
        }
      ]
    };

    movieService.findAllMovies().then((movies) => {
      this.searchData = movies.map((movie: any) => {
        return movie.toObject({ getters: false })
      });
      this.fuseRef = new Fuse(this.searchData, this.fuseOptions);
    });
  }

  init(server: Server): void {
    server.get(`${this.baseUrl}/:text`, this.search.bind(this));
  }

  async search(req: Request, res: Response) {
    let text = req.params.text;
    let movies = this.fuseRef.search(text);
    // console.log('movies', movies[0])
    res.send(movies.slice(0, 50));
  }
}
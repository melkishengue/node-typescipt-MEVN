import Server from '../server/server';
import IMiddleware from './middleware.interface';
import graphqlHttp from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { movieService } from '../services/movieService';
import { reviewService } from '../services/reviewService';
import { join } from 'path';
import { readFileSync } from 'fs';
import { IMovie } from '../models/movie';
import { IReview } from '../models/review';
import axios from 'axios';

export default class GraphqlMiddleware implements IMiddleware {
    private _baseUrl = '/graphql';
    private _schema: GraphQLSchema;
    private _search_host: string = process.env.SEARCH_HOST_URL;
    private _search_port: string = process.env.SEARCH_HOST_PORT;

    constructor () {
        const typeDefs = readFileSync(join(__dirname, '../graphql/schema.graphql'), 'utf8');
        this._schema = makeExecutableSchema({ typeDefs });
    }

    init(server: Server): void {
        server.middleware(this._baseUrl, graphqlHttp({
            schema: this._schema,
            rootValue: {
                movies: () => {
                    return movieService.findAllMovies()
                },
                findMovies: async (args: any) => {
                    const { text } = args;
                    
                    // TODO: service discovery issue...
                    let url: string = `http://loadbalancer:8080/search-microservice/search/${text}`;
                    console.log('Searching movies at ', url);

                    let res = await axios.get(url, {
                        params: {
                            foo: 'bar'
                        }
                    });

                    return res.data;
                },
                reviews: () => {
                    return reviewService.findAll()
                },
                createMovie: async (args: any) => {
                    const { year, title, imdb, type } = args;

                    let movie: IMovie = {
                        year,
                        title,
                        imdb,
                        type
                    };

                    return await movieService.create(movie);
                },
                createReview: async (args: any) => {
                    const { rating, date, reviewer, text } = args;

                    let review: IReview = {
                        rating,
                        date,
                        reviewer,
                        text
                    };

                    return await reviewService.create(review);
                }
            },
            graphiql: true
        }), false, 'graphql');
    }
}
import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export interface IMovie {
  "year": number,
  "title": string,
  "imdb": string
};

export interface IMovieModel extends IMovie, Document {};

const MovieSchema: Schema = new Schema({
  "year": Number,
  "title": String,
  "imdb": String
});

let connection = MongooseDatabaseProvider.getConnection();
const Movie: Model<IMovieModel> = connection.model<IMovieModel>("Movie", MovieSchema);

export default Movie;
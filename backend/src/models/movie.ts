import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

interface IMovieModel extends Document {
  "year": number,
  "title": string,
  "imdb": string
};

const MovieSchema: Schema = new Schema({
  "year": Number,
  "title": String,
  "imdb": String
});

let connection = MongooseDatabaseProvider.getConnection();
const Movie: Model<IMovieModel> = connection.model<IMovieModel>("Movie", MovieSchema);

export default Movie;

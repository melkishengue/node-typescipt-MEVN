import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export interface IMovieScratch {
  "year": number,
  "title": string,
  "type": string
};

interface IMovieScratchModel extends IMovieScratch, Document {};

const MovieScratchSchema: Schema = new Schema({
    "year": Number,
    "title": String,
    "type": String
});

let connection = MongooseDatabaseProvider.getConnection();
const MovieScratch: Model<IMovieScratchModel> = connection.model<IMovieScratchModel>("moviescratch", MovieScratchSchema);

export default MovieScratch;

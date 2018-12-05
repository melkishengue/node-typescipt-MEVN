import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

interface IMovieScratchModel extends Document {
  "year": number,
  "title": string,
  "type": string
};

const MovieScratchSchema: Schema = new Schema({
    "year": Number,
    "title": String,
    "type": String
});

let connection = MongooseDatabaseProvider.getConnection();
const MovieScratch: Model<IMovieScratchModel> = connection.model<IMovieScratchModel>("MovieScratch", MovieScratchSchema);

export default MovieScratch;

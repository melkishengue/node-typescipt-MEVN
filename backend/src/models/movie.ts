import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export interface IMovie {
  "year": number,
  "title": string,
  "imdb": string,
  "type": string, 
  "details"?: any
};

export interface IMovieModel extends IMovie, Document {};

const MovieSchema: Schema = new Schema({
  "year": Number,
  "title": String,
  "imdb": String,
  "type": String
},
{
  toObject: {virtuals:true},
  toJSON: {virtuals:true}
});

// see https://stackoverflow.com/questions/19287142/populate-a-mongoose-model-with-a-field-that-isnt-an-id
MovieSchema.virtual('details', {
  ref: 'moviedetail',
  localField: 'imdb',
  foreignField: 'imdb.id'
});

MovieSchema.virtual('id').get(function () {
  return this._id.toString();
});

let connection = MongooseDatabaseProvider.getConnection();
const Movie: Model<IMovieModel> = connection.model<IMovieModel>("Movie", MovieSchema);

export default Movie;
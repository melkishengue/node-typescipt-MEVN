import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export interface IMovieDetails {
  "year": number,
  "title": string,
  "rated": string,
  "released": Date,
  "runtime": number,
  "countries": Array<string>,
  "genres": Array<string>,
  "director": string,
  "writers": Array<string>,
  "actors": Array<string>,
  "plot": string,
  "poster": string,
  "imdb": {
      "id": string,
      "rating": number,
      "votes": number
  },
  "tomato": {
      "meter": number,
      "image": string,
      "rating": number,
      "reviews": number,
      "fresh": number,
      "consensus": string,
      "userMeter": number,
      "userRating": number,
      "userReviews": number
  },
  metacritic: number,
  awards: {
    "wins": number,
    "nominations": number,
    "text": string,
    "type": string

  }
};

interface IMovieDetailsModel extends IMovieDetails, Document {};

const MovieDetailsSchema: Schema = new Schema({
    "year": Number,
    "title": String,
    "rated": String,
    "released": Date,
    "runtime": Number,
    "countries": [String],
    "genres": [String],
    "director": String,
    "writers": [String],
    "actors": [String],
    "plot": String,
    "poster": String,
    "imdb": {
        "id": String,
        "rating": Number,
        "votes": Number
    },
    "tomato": {
        "meter": Number,
        "image": String,
        "rating": Number,
        "reviews": Number,
        "fresh": Number,
        "consensus": String,
        "userMeter": Number,
        "userRating": Number,
        "userReviews": Number
    },
    metacritic: Number,
    awards: {
      "wins": Number,
      "nominations": Number,
      "text": String
  
    }
});

let connection = MongooseDatabaseProvider.getConnection();
const MovieDetails: Model<IMovieDetailsModel> = connection.model<IMovieDetailsModel>("moviedetail", MovieDetailsSchema);

export default MovieDetails;

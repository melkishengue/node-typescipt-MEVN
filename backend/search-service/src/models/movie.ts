import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export interface IMovie {
  "year": number,
  "title": string,
  "imdb": string,
  "type": string, 
  "details": {
    "year": number,
    "title": string,
    "rated": string,
    "released": Date,
  "details"?: any,
    "runtime": number,
    "countries": [string],
    "genres": [string],
    "director": string,
    "writers": [string],
    "actors": [string],
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
    "text": string
    }
}
};

export interface IMovieModel extends IMovie, Document {};

const MovieSchema: Schema = new Schema({
  "year": Number,
  "title": String,
  "imdb": String,
  "type": String,
  "details": {
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
    }
});

let connection = MongooseDatabaseProvider.getConnection();
const Movie: Model<IMovieModel> = connection.model<IMovieModel>("Movie", MovieSchema);

export default Movie;
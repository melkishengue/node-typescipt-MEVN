import { Schema, Model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

export interface IReview {
  "rating": number,
  "date": Date,
  "reviewer": string,
  "text": string
};

interface IReviewModel extends IReview, Document {};

// TODO: do we really need to define the types twice ?!
const ReviewSchema: Schema = new Schema({
  "rating": Number,
  "date": Date,
  "reviewer": String,
  "text": String
});

let connection = MongooseDatabaseProvider.getConnection();
const Review: Model<IReviewModel> = connection.model<IReviewModel>("Review", ReviewSchema);

export default Review;

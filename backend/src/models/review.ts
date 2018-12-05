import { Schema, Model, model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

interface IReviewModel extends Document {
  "rating": number,
  "date": Date,
  "reviewer": string,
  "text": string
};

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

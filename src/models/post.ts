import { Schema, Model, model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

interface IPostModel extends Document {
  "id": number,
  "title": string,
  "body": string
};

const PostSchema: Schema = new Schema({
  "id": Number,
  "title": String,
  "body": String
});

let connection = MongooseDatabaseProvider.getConnection();
const Post: Model<IPostModel> = connection.model<IPostModel>("Post", PostSchema);

export default Post;

import { Schema, Model, model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';

interface IPostModel extends Document {
  "id": number,
  "title": string,
  "body": string,
  "author": Schema.Types.ObjectId
};

const PostSchema: Schema = new Schema({
  "id": Number,
  "title": String,
  "body": String,
  "author": { type: Schema.Types.ObjectId, ref: 'User' }
});

let connection = MongooseDatabaseProvider.getConnection();
const Post: Model<IPostModel> = connection.model<IPostModel>("Post", PostSchema);

export default Post;

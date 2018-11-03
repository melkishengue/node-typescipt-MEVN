import { Schema, Model, model, Document } from "mongoose";
import MongooseDatabaseProvider from '../database/mongooseDatabaseProvider';
// mongoose.Promise = global.Promise;

interface IUserModel extends Document {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": string,
      "lng": string
    }
  },
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string
  }
};

// TODO: do we really need to define the types twice ?!
const UserSchema: Schema = new Schema({
  "id": Number,
  "name": String,
  "username": String,
  "email": String,
  "address": {
    "street": String,
    "suite": String,
    "city": String,
    "zipcode": String,
    "geo": {
      "lat": String,
      "lng": String
    }
  },
  "phone": String,
  "website": String,
  "company": {
    "name": String,
    "catchPhrase": String,
    "bs": String
  }
});

let connection = MongooseDatabaseProvider.getConnection();
const User: Model<IUserModel> = connection.model<IUserModel>("User", UserSchema);

export default User;

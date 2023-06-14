import { Schema, model, connect } from "mongoose";

interface User {
  email:String,
  password: any,
  name: String,
  phone:Number,
  profileUrl: String,
  bio: String,
  verified:Boolean,
}

const schema = new Schema<User>(
  {
    email: {
      type: String,
      required:true,
   //   unique:true
    },
    password: {
      type: String,
      required:true,
      default:"password"
    },
    
    name: {
      type: String,
      default:"Edit user name"
    },
    bio: {
      type: String,
      default:"No bio stated yet"
    },
    phone: {
      type: Number,
      default:0
    },
    profileUrl:{
      type: String,
      default:""
    },
    verified:{
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const User = model<User>("Userysbgghh-ghhuhhttygyyghyyhkkhhthcate", schema);
export default User;

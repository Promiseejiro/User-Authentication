import mongoose from "mongoose";

interface Token{
  accountToken: String,
  userId:String
}

const Schema =new mongoose.Schema<Token>({
  accountToken:{
    type:String,
    required:true,
    unique:true,
  },
  userId:{
    type:String,
    required:true,
    unique:true,
  }
});
const ConfirmationSchema =mongoose.model<Token>("confirmatgyygghggyggvvghyygyyygkggghghhhhggn-token",Schema);
export default ConfirmationSchema
import { Schema, model, connect } from "mongoose";

interface IUpload {
  id: string;
  filepath: string;
  discription: string;
}

const schema = new Schema<IUpload>(
  {
    id: {
      type: String,
      default: "",
    },
    filepath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const uploadSchema = model<IUpload>("image-uploader", schema);

export default uploadSchema;

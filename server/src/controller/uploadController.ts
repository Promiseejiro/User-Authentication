import { Request, Response } from "express";
import uploadSchema from "../modal/modal";
import cloudinary from "../utils/cloudinarySetup";
const uploadRoute = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file?.path, {
        folder: "image-uploader",
        resource_type: "auto",
      });
      const body = {
        id: req.body.id,
        filepath: result.secure_url,
      };
      const fileDetails = new uploadSchema(body);
      await fileDetails.save();
      console.log(fileDetails);
      res.status(200).send(fileDetails);
    }
  } catch (err) {
    console.log(err);
  }
};

export default uploadRoute;

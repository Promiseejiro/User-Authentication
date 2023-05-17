import express from "express";
import cors from "cors";
import router from "./route/routes";
import enviromentVariable from "./config";
import connectDb from "./db/db";
//  dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();
const port = 2000;
// import { config } from "./config/config";
const app = express();
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(port, (): void => {
  connectDb(enviromentVariable.MONGU_URI);
  console.log("app is listenig on port 2000");
});

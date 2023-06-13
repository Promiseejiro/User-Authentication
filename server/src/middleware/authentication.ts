/*import IsEmail from "isemail";
import ConfirmationSchema from "../modal/token";
import User from "../modal/modal";
import nodemailer from 'nodemailer';
import {v4 as uuid} from "uuid"
import Mailer from "../utils/nodemailer";
import { hashHandler } from "../utils/bcrypt";

const authenticate = async(email: string, password : string)=>{
  if(email && password){
    if(IsEmail.validate(email)){
  /*  if(password){
      if(password="string"){
        res.redirect("/setpassword")
      }
     const userExist = await User.findOne({email:email})
if(userExist){
return  res.json({message:"Email already registered"});
}else{
  const hashedPassword = await hashHandler(password);
  
  const newUser =await User.create({
    email,
    password:hashedPassword
  });
  const hashedtoken= await hashHandler(uuid());
 const token =await ConfirmationSchema.create({
  userId: newUser._id,
   accountToken:hashedtoken
 });
 const url = await `http://localhost:2000/${newUser._id}/verify/${token.accountToken}`;
 await Mailer(email,"Confirmation Email",url);
  res.send({
    message:"An email has been sent, Please verify"
  });
}}  else{
    return  res.json({message:"Input password"})
    }
   const userExist = await User.findOne({email:email})
if(userExist){
return "Email already registered"
}else 
{ 
  const newUser =await User.create({email:email, password:password});
  return `${newUser.email}`
}
  }
  else{
 return "invalid Email"
  }
  }else{
    return "input Email"
  }
}


export default authenticate
*/
import express from "express";
import jwt from "jsonwebtoken";
const authenticate = async (req: express.Request, res:express.Response, next:any) => {
  const authHeader =await req.headers['authorization'];
if(!authHeader){
  res.send({message:"no token sent"})
}else{
  const token =await authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.send({message:"invalid token"})
  }
  try {
  /*  const decodedToken = jwt.verify(token, 'your_secret_key');
  req.user = {userId:decodedToken.userId, email:decodedToken.email}*/
    next();
  } catch (error) {
    return res.send({message:"Invalid token"});
  }
}
}

export default authenticate
/*function authenticate(req:express.Request, res:express.Response, next:any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.send({message:"notoken"});
  }

const payload = jwt.verify(token, 'your_secret_key', (err:any, user:any) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log(payload)
   // req.user = { _id: payload._id};
    next();
  });
}*/


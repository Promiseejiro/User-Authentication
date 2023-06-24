import bcrypt from "bcryptjs";
import express from "express";
import IsEmail from "isemail";
import Mailer from "../utils/nodemailer";
//mportt { hashHandler } from "../utils/bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import User from "../modal/modal";
import ConfirmationSchema from "../modal/token";
export const hashHandler = async (prehashedValue: string) => {
  const hashed = await bcrypt.hash(prehashedValue, 8);
  return hashed;
};
export const signUp = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  if (email && password) {
    if (IsEmail.validate(email)) {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        res.send({ message: "User already exist" });
      } else {
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          email: email,
          password: hashedpassword,
        });
        const verificationUrl = await `http://localhost:2000/${newUser._id}`;
        console.log(verificationUrl);
        Mailer(email, "Account verification", verificationUrl);
        res.status(200).send({
          message:
            "A verification mail has been sent to your email account please verify email account.",
        });
      }
    } else {
      res.send({ message: "Invalid email" });
    }
  } else {
    res.send({
      message: "Input email and password",
    });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);
  const { email, password, bio, phone, profileUrl, name } = await req.body;

  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ _id: req.user.userId });
  if (user) {
    
    //check permission
    if (user._id == req.user.userId) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user.userId },
        {
          email: email,
          password: hashedpassword,
          bio: bio,
          phone: phone,
          name: name,
          profileUrl: profileUrl,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(updatedUser);
      res.send({ message: "User details successfully update" });
    } else {
      res.send({ message: "not permitted to make update" });
    }
  } else {
    res.send({ message: "Erro cannot update user" });
  }
};

export const verifyAccount = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = await req.params;
  const user = await User.findOne({ _id: id });
  const updatedUser = await User.updateOne({ _id: id, Verified: true });
  res.redirect("http://localhost:3000/login?message: Account Verified");
  //console.log(updatedUser.acknowledged)
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = await req.body;
  console.log(email, password);
  if (email && password) {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      console.log(user.password);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          "your_secret_key",
          { expiresIn: "30d" }
        );
        console.log(token);
        res.send({ token: token });
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "No such user registered" });
    }
  } else {
    res.send({ message: "Input email and password" });
  }
};

export const getAuthenticatedUser = async (
  req: express.Request,
  res: express.Response
) => {
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  res.send({ user: user });
};
export const setpassword = (req: express.Request, res: express.Response) => {};

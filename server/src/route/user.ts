import express from "express";
import passport from "passport";
import upload from "../utils/multer";
const router = express.Router();

const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;










export default router
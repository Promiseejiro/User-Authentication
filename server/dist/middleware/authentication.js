"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = yield req.headers["authorization"];
    if (!authHeader) {
        res.send({ message: "no token sent" });
    }
    else {
        const token = (yield authHeader) && authHeader.split(" ")[1];
        if (!token) {
            res.send({ message: "invalid token" });
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, "your_secret_key");
            console.log(decodedToken);
            req.user = decodedToken;
            next();
        }
        catch (error) {
            return res.send({ message: "Invalid token" });
        }
    }
});
exports.default = authenticate;
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

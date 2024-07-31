import * as express from "express";
import { Request, Response, NextFunction } from "express";

import { userRules } from "../rules";
import * as authController from "../controllers/auth-controller";
import { auth } from "../middlewares/auth-middleware";

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(userRules.forRegister, authController.register);
authRouter
  .route("/login")
  .post(userRules.forLogin, authController.login as any);
authRouter.route("/").get(auth, authController.authorize as any);

export default authRouter;

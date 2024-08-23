import * as express from "express";
import { auth } from "../../middlewares/auth-middleware";
import { UserRules } from "../../rules";
import { AuthController } from "./auth-controller";

const AuthRouter = express.Router();

// POST
AuthRouter.route("/register").post(
  UserRules.forRegister,
  AuthController.register
);
AuthRouter.route("/login").post(
  UserRules.forLogin,
  AuthController.login as any
);

// GET
AuthRouter.route("/").get(auth, AuthController.authorize as any);

export default AuthRouter;

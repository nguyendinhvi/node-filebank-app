import * as express from "express";
import { auth } from "../../middlewares/auth-middleware";
import { UserRules } from "../../rules";
import { AuthController } from "./auth-controller";

const AuthRouter = express.Router();

// POST
AuthRouter.route("/signup").post(UserRules.forRegister, AuthController.signup);
AuthRouter.route("/login").post(UserRules.forLogin, AuthController.login);

// GET
AuthRouter.route("/").get(auth, AuthController.authorize as any);

export default AuthRouter;

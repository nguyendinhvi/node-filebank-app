import * as express from "express";
import { userController } from "./user-controller";

const UserRouter = express.Router();

UserRouter.route("/:id").get(userController.getUserById);
UserRouter.route("/profile/:id").get(userController.getUserProfile);

export default UserRouter;

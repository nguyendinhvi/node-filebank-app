import * as express from "express";
import { userController } from "./user-controller";

const UserRouter = express.Router();

UserRouter.route("/:id").get(userController.getUserById as any);

export default UserRouter;

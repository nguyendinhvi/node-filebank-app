import * as express from "express";
import { userController } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.route("/:id").get(userController.getUserById as any);

export default userRouter;

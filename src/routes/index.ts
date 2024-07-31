import * as express from "express";

import authRouter from "./auth.routes";
import folderRouter from "./folder.routes";
import userRouter from "./user.routes";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/folder", folderRouter);
routes.use("/user", userRouter);

export default routes;

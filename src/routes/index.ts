import * as express from "express";

import FolderRouter from "../modules/folder/folder.routes";
import AuthRouter from "../modules/auth/auth.routes";
import UserRouter from "../modules/user/user.routes";
import FileRouter from "../modules/file/file.routes";

const routes = express.Router();

routes.use("/auth", AuthRouter);
routes.use("/folder", FolderRouter);
routes.use("/user", UserRouter);
routes.use("/file", FileRouter);

export default routes;

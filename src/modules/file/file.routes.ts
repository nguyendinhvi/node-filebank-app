import * as express from "express";
import { fileController } from "./file.controller";
import { upload } from "../../middlewares/multer.middleware";
import { auth } from "../../middlewares/auth-middleware";

const FileRouter = express.Router();

FileRouter.route("/my-files").get(auth, fileController.getMyFiles);

FileRouter.route("/upload").post(auth, upload.single("file"), fileController.upload);

export default FileRouter;

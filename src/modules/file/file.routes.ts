import * as express from "express";
import { fileController } from "./file.controller";
import { upload } from "../../middlewares/multer.middleware";
import { auth } from "../../middlewares/auth-middleware";

const FileRouter = express.Router();

// GET
FileRouter.route("/my-files").get(auth, fileController.getMyFiles);
FileRouter.route("/folder/:id").get(fileController.getFilesByFolderId);

// POST
FileRouter.route("/upload").post(
  auth,
  upload.single("file"),
  fileController.upload
);

// DELETE
FileRouter.route("/:id").delete(auth, fileController.deleteById);

export default FileRouter;

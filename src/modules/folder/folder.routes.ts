import * as express from "express";
import { FolderController } from "./folder.controllers";
import { auth } from "../../middlewares/auth-middleware";

const FolderRouter = express.Router();

// POST
FolderRouter.route("/").post(auth, FolderController.createNewFolder);

// GET
FolderRouter.route("/my-folder").get(auth, FolderController.getMyFolder);
FolderRouter.route("/:id").get(FolderController.getFolderById);

export default FolderRouter;

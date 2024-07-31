import { getFolderById } from "./../controllers/folder.controllers";
import * as express from "express";
import { folderController } from "../controllers/folder.controllers";
import { auth } from "../middlewares/auth-middleware";

const folderRouter = express.Router();

// POST
folderRouter.route("/").post(auth, folderController.createNewFolder as any);

// GET
folderRouter.route("/:id").get(folderController.getFolderById as any);
folderRouter.route("/my-folder").get(auth, folderController.getMyFolder as any);

export default folderRouter;

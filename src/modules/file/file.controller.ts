import { NextFunction } from "express";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCodes } from "../../helpers/response-codes";
import { FileService } from "./file.service";

export const upload = async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const { user } = req.decodedToken ?? {};
    const fileUploaded = await FileService.upload({
      // ...req.body,
      user_id: user.id,
      file: req.file,
    });
    res.success(fileUploaded);
  } catch (e) {
    res.error(ResponseCodes.error);
  }
};
export const getMyFiles = async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const { user } = req.decodedToken ?? {};
    const myFiles = await FileService.getMyFiles({
      user_id: user.id,
      ...req.query,
    });
    res.success(myFiles);
  } catch (e) {
    res.error(ResponseCodes.error);
  }
};

export const fileController = { upload, getMyFiles };

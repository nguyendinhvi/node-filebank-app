import { NextFunction } from "express";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCode } from "../../helpers/response-codes";
import { FileService } from "./file.service";
import { sendError } from "../../helpers/api";

export const upload = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const { user } = req.decodedToken ?? {};
    const fileUploaded = await FileService.upload({
      ...req.body,
      user_id: user.id,
      file: req.file,
    });
    res.success(fileUploaded);
  } catch (e) {
    res.error(ResponseCode.error);
  }
};

export const getMyFiles = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const { user } = req.decodedToken ?? {};
    const myFiles = await FileService.getMyFiles({
      user_id: user.id,
      ...req.query,
    });
    res.success(myFiles);
  } catch (e) {
    res.error(ResponseCode.error);
  }
};

export const getFilesByFolderId = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const files = await FileService.getFilesByFolderId({
      folder_id: req.params?.id,
    });
    res.success(files);
  } catch (e) {
    res.error(ResponseCode.error);
  }
};

export const deleteById = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const { user } = req.decodedToken ?? {};
    await FileService.deleteById(req.params?.id, req.decodedToken?.user?.id);
    res.success(ResponseCode.delete_success);
  } catch (e) {
    sendError(res, e);
  }
};

export const fileController = {
  upload,
  getMyFiles,
  deleteById,
  getFilesByFolderId,
};

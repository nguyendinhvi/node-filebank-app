import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ExtendRequest, ExtendResponse } from "../helper/express-extend";
import { ResponseCodes } from "../helper/response-codes";
import { auth } from "../middlewares/auth-middleware";
import { FolderAddModel } from "../models/schemas/folder";
import { UserAddModel } from "../models/schemas/user";
import { UserService } from "../services/user.service";
import { folderService } from "../services/folder.service";

export const createNewFolder = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const { name, level } = req.body as FolderAddModel;
    const { user } = req.decodedToken ?? {};
    await folderService.createfolder({ name, user_id: user?.id, level });
    res.success(ResponseCodes.create_success);
  } catch (e) {
    res.error(ResponseCodes.error);
    next(e);
  }
};

export const getMyFolder = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const { user } = req.decodedToken ?? {};
    const data = await folderService.getMyFolder(user?.id);
    res.success(data);
  } catch (e) {
    res.error(ResponseCodes.error);
    next(e);
  }
};

export const getFolderById = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    console.log("req.params?.id :", req.params?.id);
    const data = await folderService.getFolderById(req.params?.id);
    res.success(data);
  } catch (e) {
    res.error(ResponseCodes.error);
    next(e);
  }
};

export const folderController = {
  createNewFolder,
  getMyFolder,
  getFolderById,
};

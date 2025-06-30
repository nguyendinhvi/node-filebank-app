import { NextFunction } from "express";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCode } from "../../helpers/response-codes";
import { FolderAddModel } from "./folder.model";
import { FolderService } from "./folder.service";

export const createNewFolder = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const { name, level, parent_id } = req.body as FolderAddModel;
    const { user } = req.decodedToken ?? {};

    const _folder = await FolderService.createfolder({
      name,
      user_id: user?.id,
      level,
      parent_id,
    });

    res.success(_folder);
  } catch (e) {
    res.error(ResponseCode.error);
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
    const data = await FolderService.getMyFolder({
      user_id: user?.id,
      ...(req.query as any),
    });

    res.success(data);
  } catch (e) {
    res.error(ResponseCode.error);
    next(e);
  }
};

export const getFolderById = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const data = await FolderService.getFolderById(req.params?.id);
    res.success(data);
  } catch (e) {
    res.error(ResponseCode.error);
    next(e);
  }
};

export const FolderController = {
  createNewFolder,
  getMyFolder,
  getFolderById,
};

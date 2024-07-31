import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ExtendRequest, ExtendResponse } from "../helper/express-extend";
import { ResponseCodes } from "../helper/response-codes";
import { auth } from "../middlewares/auth-middleware";
import { FolderAddModel } from "../models/schemas/folder";
import { UserAddModel } from "../models/schemas/user";
import { UserService } from "../services/user.service";

export const getUserById = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const user = await UserService.getUserById(req.params?.id);
    if (!user) return res.error(ResponseCodes.user_not_found);
    res.success(user);
  } catch (e) {
    res.error(ResponseCodes.error);
  }
};

export const userController = { getUserById };

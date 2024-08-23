import { NextFunction } from "express";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCodes } from "../../helpers/response-codes";
import { UserService } from "./user.service";

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

import { NextFunction } from "express";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCode } from "../../helpers/response-codes";
import { UserService } from "./user.service";

export const getUserById = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const user = await UserService.getUserById(req.params?.id);
    if (!user) return res.error(ResponseCode.user_not_found);
    res.success(user);
  } catch (e) {
    res.error(ResponseCode.error);
  }
};
export const getUserProfile = async (
  req: ExtendRequest,
  res: ExtendResponse
) => {
  try {
    const user = await UserService.getProfileById(req.params?.id);
    if (!user) return res.error(ResponseCode.user_not_found);
    res.success(user);
  } catch (e) {
    res.error(ResponseCode.error);
  }
};

export const userController = { getUserById, getUserProfile };

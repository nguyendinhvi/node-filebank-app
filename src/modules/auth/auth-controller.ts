import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCodes } from "../../helpers/response-codes";
import { UserAddModel } from "../user/user.model";
import { UserService } from "../user/user.service";

export const signup = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    // validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body as UserAddModel;

    const _user = await UserService.signup(payload);
    res.success(_user);
  } catch (e) {
    res.error(e?.message);
  }
};

export const login = async (req: ExtendRequest, res: ExtendResponse) => {
  try {
    const errors = validationResult(req);
    console.log("errors :", errors);
    if (!errors.isEmpty()) {
      return res.error(ResponseCodes.error);
    }

    const { email, password } = req.body;

    const data: any = await UserService.login(email, password);
    req.decodedToken = await UserService.verifyToken(data.token);

    res.success(data);
  } catch (e) {
    console.log("e :", e);
    res.error(e.message);
  }
};

export const authorize = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    res.success(req.decodedToken);
  } catch (e) {
    next(e);
  }
};

export const AuthController = {
  signup,
  login,
  authorize,
};

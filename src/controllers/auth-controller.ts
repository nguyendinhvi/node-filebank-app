import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ExtendRequest, ExtendResponse } from "../helper/express-extend";
import { ResponseCodes } from "../helper/response-codes";
import { auth } from "../middlewares/auth-middleware";
import { UserAddModel } from "../models/schemas/user";
import { UserService } from "../services/user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body as UserAddModel;

    const u = await UserService.register(payload);
    res.send(u);
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors :", errors.array());
      return res.error(ResponseCodes.error);
    }

    const { email, password } = req.body;

    const data: any = await UserService.login(email, password, res as any);
    req.decodedToken = await UserService.verifyToken(data.token);

    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const authorize = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    console.log("zo");

    res.success(req.decodedToken);
  } catch (e) {
    next(e);
  }
};

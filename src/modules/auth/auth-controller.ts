import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ExtendRequest, ExtendResponse } from "../../helpers/express-extend";
import { ResponseCode } from "../../helpers/response-codes";
import { auth } from "../../middlewares/auth-middleware";
import { UserAddModel } from "../user/user.model";
import { UserService } from "../user/user.service";
import { sendError, throwError } from "../../helpers/api";
import { HttpStatusCode } from "../../utils/enum";

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
    if (!errors.isEmpty())
      throwError(ResponseCode.error, HttpStatusCode.NO_CONTENT);

    const { email, password } = req.body;
    const data: any = await UserService.login(email, password, res);
    req.decodedToken = await UserService.verifyToken(data.token);

    res.success(data);
  } catch (e) {
    sendError(res, e);
  }
};

export const authorize = async (req: ExtendRequest, res: ExtendResponse) => {
  try {
    res.success(req.decodedToken);
  } catch (e) {
    sendError(res, e);
  }
};

export const AuthController = {
  register,
  login,
  authorize,
};

import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { ExtendRequest, ExtendResponse } from "../helpers/express-extend";
import { ResponseCode } from "../helpers/response-codes";
import { UserService } from "../modules/user/user.service";
import { publicPaths } from "./public-path";
import { sendError, throwError } from "../helpers/api";
import { HttpStatusCode } from "../utils/enum";

export const isPublicPath = (req: Request): boolean => {
  const path = `${req.method}@${req.path}`;
  const public_path = publicPaths.find((e) => e.match(path) !== null);
  if (public_path) return true;
  return false;
};

const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
  return headers["x-access-token"] as string;
};

export const auth = async (
  req: ExtendRequest,
  res: ExtendResponse,
  next: NextFunction
) => {
  try {
    if (isPublicPath(req)) return next();

    const token = getTokenFromHeaders(req.headers);
    let decoded = await UserService.verifyToken(token);

    if (!decoded) {
      throwError(
        ResponseCode.token_missing_or_invalid,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    delete decoded?.["user"]?.["password"];
    req.decodedToken = decoded;

    return next();
  } catch (error) {
    sendError(res, error);
  }
};

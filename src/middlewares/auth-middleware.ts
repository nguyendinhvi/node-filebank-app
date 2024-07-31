import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { ExtendRequest } from "../helper/express-extend";
import { ErrorMessages, ResponseCodes } from "../helper/response-codes";
import { UserService } from "../services/user.service";
import { publicPaths } from "./public-path";

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
  res: Response,
  next: NextFunction
) => {
  if (isPublicPath(req)) return next();

  const token = getTokenFromHeaders(req.headers);
  const decoded = await UserService.verifyToken(token);
  if (!decoded)
    return res.json({
      error: ResponseCodes[ResponseCodes.token_missing_or_invalid],
    });
  req.decodedToken = decoded;
  return next();
};

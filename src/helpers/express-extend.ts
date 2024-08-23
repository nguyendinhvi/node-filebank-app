import { NextFunction, Request, Response } from "express";
import { Transaction, TransactionOptions } from "sequelize";
import { mySequelize } from "../migrations/migration";
import { ErrorMessages, ResponseCodes } from "./response-codes";

export interface ExtendRequest extends Request {
  decodedToken?: any;
  // checksum?: Checksum
}

export interface ExtendResponse extends Response {
  success(data: any): ExtendResponse;
  error(code?: ResponseCodes, status?: number): ExtendResponse;
}

export const customResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let anyRes = res as any;
  anyRes.startTransaction = async (options?: TransactionOptions) => {
    let transaction = await mySequelize.transaction(options);
    anyRes.transaction = transaction;
    return transaction;
  };

  anyRes.flushTransaction = async () => {
    if (anyRes.transaction) {
      await anyRes.transaction.commit();
      anyRes.transaction = null;
    }
  };

  anyRes.success = async (data: any) => {
    if (anyRes.transaction) {
      await anyRes.transaction.commit();
    }
    return res.status(200).json({
      code: ResponseCodes.ok,
      success: true,
      data,
    });
  };

  anyRes.error = async (code: ResponseCodes, status: number) => {
    if (anyRes.transaction) {
      await anyRes.transaction.rollback();
    }
    return res.status(status || 500).json({
      code: ResponseCodes[code] || ResponseCodes[ResponseCodes.error],
      success: false,
      message: ErrorMessages.get(code || ResponseCodes.error),
    });
  };

  next();
};

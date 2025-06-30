import { ExtendResponse } from "./express-extend";
import { ResponseCode } from "./response-codes";

export const throwError = (code: ResponseCode, status: number) => {
  throw { code, status };
};

export const sendError = (
  res: ExtendResponse,
  e: { code: ResponseCode; status: number }
) => {
  return res.error(e?.code, e?.status);
};

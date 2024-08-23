import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { Attributes } from "../../models/includes";
import { User, UserAttributes, UserViewModel } from "./user.model";

import { ResponseCodes } from "../../helpers/response-codes";
import { Response } from "express";
import { ExtendResponse } from "../../helpers/express-extend";

export class UserService {
  private static readonly _saltRounds = 12;
  private static readonly _jwtSecret = "0.rfyj3n9nzh";

  //   static get userAttributes() {
  //     return ["id", "email"];
  //   }

  private static _user: any;

  static get user() {
    return UserService._user;
  }

  static signup = async (payload: UserAttributes) => {
    try {
      const _user_existed = await User.findOne({
        where: { email: payload?.email },
      });
      console.log("_user_existed :", _user_existed);
      if (_user_existed) {
        throw new Error(ResponseCodes.email_account_already_exists);
      }

      const hash = await bcrypt.hash(payload.password, this._saltRounds);
      let _user = await User.create({ ...payload, password: hash });
      delete _user?.password;
      return _user;
    } catch (e) {
      throw e;
    }
  };

  static login = async (
    email: string,
    password: string,
    res: ExtendResponse
  ) => {
    try {
      let user: any = await User.findOne({
        where: { email },
        // attributes: Attributes.user,
        // include: [Includes.clazz],
      });
      if (!user) return res.error(ResponseCodes.user_not_found);

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) return res.error(ResponseCodes.email_or_password_is_wrong);

      const userJson = user.toJSON();
      delete userJson.password;

      return {
        user: userJson,
        token: jwt.sign({ user }, this._jwtSecret, {
          algorithm: "HS256",
        }),
      };
    } catch (error) {
      return error;
    }
  };

  static verifyToken = async (token: string) => {
    try {
      return await jwt.verify(
        token,
        this._jwtSecret,
        async (err, decoded: any) => {
          if (err) return false;
          if (decoded) return decoded;
        }
      );
    } catch (e) {
      return false;
    }
  };

  static getUserById = async (id: string) => {
    return await User.findOne({ where: { id }, attributes: Attributes.user });
  };

  static sync = async () => {};
}

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { Attributes } from "../../models/includes";
import { User, UserAttributes, UserViewModel } from "./user.model";

import { ResponseCode } from "../../helpers/response-codes";
import { Response } from "express";
import { ExtendResponse } from "../../helpers/express-extend";
import { error } from "console";
import { throwError } from "../../helpers/api";
import { File } from "../file/file.model";
import { col, fn } from "sequelize";

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

  static register = async (payload: UserAttributes) => {
    try {
      const hash = await bcrypt.hash(payload.password, this._saltRounds);
      const u = await User.create({ ...payload, password: hash });

      return u as UserViewModel;
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
      // if (!user) return  res.error(ResponseCode.user_not_found);
      if (!user) throw ResponseCode.user_not_found;

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) throwError(ResponseCode.email_or_password_is_wrong, 402);

      const userJson = user.toJSON();
      delete userJson.password;

      return {
        user: userJson,
        token: jwt.sign({ user }, this._jwtSecret, {
          algorithm: "HS256",
        }),
      };
    } catch (error) {
      throw error;
      return error;
    }
  };

  static verifyToken = async (token: string) => {
    try {
      return jwt.verify(token, this._jwtSecret, async (err, decoded: any) => {
        if (err) return false;
        if (decoded) return decoded;
      });
    } catch (e) {
      return false;
    }
  };

  static getUserById = async (id: string) => {
    return await User.findOne({ where: { id }, attributes: Attributes.user });
  };

  static getProfileById = async (id: string) => {
    try {
      await User.findOne({ where: { id }, attributes: Attributes.user });
      const _profile = await File.findAll({
        where: { user_id: id },
        attributes: [[fn("SUM", col("size")), "totalSize"]],
        raw: true,
      });

      return _profile;
    } catch (error) {}
  };

  static sync = async () => {};
}

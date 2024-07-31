import * as bcrypt from "bcrypt";
import { check } from "express-validator/check";
import { User } from "../models/schemas";

export const userRules = {
  forRegister: [
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required field.")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (email) => {
        let u = await User.findOne({ where: { email } });
        if (u) throw new Error("Email already exists");
        return true;
      }),
  ],

  forLogin: [
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required field")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (email) => {
        let u = await User.findOne({ where: { email } });
        if (!u) throw new Error("Invalid email or password");
        return true;
      }),
    // check("password").custom(async (password, { req }) => {
    //   const u = await User.findOne({ where: { email: req.body.email } });
    //   const compare = await bcrypt.compare(password, u!.password);

    //   if (!compare) throw new Error("Invalid email or password");
    //   return true;
    // }),
  ],
};

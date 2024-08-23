import { application } from "express";
import app from "./app";

export const config: any = process.env;

(async () => {
  try {
    await app.init();
    app.start(config.PORT);
  } catch (error) {
    console.log("LISTEN ERROR", error);
  }
})();

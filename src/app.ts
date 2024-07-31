import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
} from "express";

import cors from "cors";

import * as bodyParser from "body-parser";
import { config } from "dotenv";
import { databaseMigration } from "./migrations/migration";

import routes from "./routes";
import { auth } from "./middlewares/auth-middleware";
import { customResponse } from "./helper/express-extend";

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: Function
) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

class App {
  public app: Application;

  constructor() {
    this.app = express();
    config();
  }

  public async init() {
    await databaseMigration();

    this.app.use(customResponse);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(errorHandler);
    // this.app.use("/api", auth);
    this.app.use("/api/v1", routes);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`server is listening on ${port}`);
    });
  }
}

export default new App();

// const PORT = process.env.PORT;

// app.get("/", (req: Request, res: Response, next: Function) => {
//   res.send("🚀 init");
// });

// app.use((req: Request, res: Response, next: Function) => {
//   next(new createHttpError.NotFound());
// });

// app.listen(PORT, () => {
//   console.log(`🚀  is listening on port ${PORT}`);
// });

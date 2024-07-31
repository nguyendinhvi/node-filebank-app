/* eslint-disable */
import { exec } from "child_process";
import path from "path";
import { Sequelize } from "sequelize";
import { config } from "..";

import mysql from "mysql2/promise";

import * as schemas from "../models/schemas";
import sequelize from "sequelize";

let mySequelize: Sequelize;

const databaseMigration = async () => {
  const models: any = schemas;
  try {
    console.log("Connecting to mysql...");
    mySequelize = new Sequelize(
      config.DB_NAME,
      config.DB_USER,
      config.DB_PASSWORD,
      {
        host: config.DB_HOST,
        dialect: "mysql",
        port: +config.DB_PORT,
        define: {
          charset: config.DB_CHARACTER_SET,
          collate: config.DB_COLLATE,
          timestamps: true,
        },
        dialectOptions: {
          decimalNumbers: true,
        },
        pool: {
          max: +config.MAX_POOL || 5,
          min: +config.MIN_POOL || 1,
          acquire: 10000,
          idle: 30000,
        },
        logging: false,
      }
    );

    await mySequelize.authenticate();
    console.log("Loading models...", models);

    // model init
    Object.keys(models).forEach((x) => {
      models[x].initialize && models[x].initialize(mySequelize);
    });

    // create model associate
    Object.keys(models).forEach((x) => {
      if (models[x].associate) {
        models[x].associate && models[x].associate(models);
      }
    });

    // create table
    // Object.keys(models).forEach((x) => {
    //   models[x].sync({ force: true, alter: true });
    // });
    mySequelize.sync({ alter: true });
  } catch (err: any) {
    console.log("err :", err);
    return new Promise((_, reject) => reject(false));
  }
  console.log("Finished migration");
};

export { databaseMigration, mySequelize };

import { Model, DataTypes, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export interface UserAttributes {
  id?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface UserAddModel {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UserViewModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class User extends Model<UserAttributes, UserAttributes> {
  declare id?: string;
  declare first_name?: string;
  declare last_name?: string;
  declare email: string;
  declare password: string;

  static initialize = (sequelize: any) => {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: () => uuidv4(),
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize, // We need to pass the connection instance
        tableName: "users", // We need to choose the table name in database
        modelName: "user",
        timestamps: true,
        paranoid: true,
        underscored: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
        deletedAt: "deleted_at",
      }
    );
  };

  static associate(models: any) {}
}

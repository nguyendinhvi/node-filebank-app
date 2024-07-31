import { Model, DataTypes } from "sequelize";

interface FolderAttributes {
  id?: number;
  name: string;
  level: number;
  user_id?: string;
}

export interface FolderAddModel {
  name: string;
  user_id: string;
  parent_id?: number;
  level: number;
}

export class Folder extends Model<FolderAttributes, FolderAttributes> {
  declare id: number;

  declare name: string;

  declare level: number;

  static initialize = (sequelize: any) => {
    this.init(
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT.UNSIGNED,
        },
        name: DataTypes.STRING,
        level: DataTypes.STRING,
      },
      {
        sequelize, // We need to pass the connection instance
        tableName: "folder", // We need to choose the table name in database
        modelName: "folder",
        timestamps: true,
        paranoid: true,
        underscored: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
        deletedAt: "deleted_at",
      }
    );
  };

  static associate(models: any) {
    this.belongsTo(models.User, { as: "users", foreignKey: "user_id" });
    this.belongsTo(models.Folder, {
      as: "folder",
      foreignKey: "parent_id",
    });
  }
}

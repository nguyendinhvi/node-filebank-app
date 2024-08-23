import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface FileAttributes {
  id?: string;
  original_filename: string;
  url: string;
  secure_url: string;
  access_mode: string;
  type: string;
  size: number;
  resource_type: string;
  width: number;
  height: number;
  signature: string;
  version_id: string;
  version: number;
  level: number;
  asset_id: string;
  format: string;
  folder_id?: string;
  user_id?: string;
}

export interface FileAddModel {
  name: string;
  user_id: string;
}

export class File extends Model<FileAttributes, FileAttributes> {
  declare id: string;
  declare original_filename: string;
  declare url: string;
  declare secure_url: string;
  declare access_mode: string;
  declare type: string;
  declare size: number;
  declare resource_type: string;
  declare width: number;
  declare height: number;
  declare signature: string;
  declare version_id: string;
  declare version: number;
  declare level: number;
  declare asset_id: string;
  declare format: string;
  declare user_id: string;

  static initialize = (sequelize: any) => {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: () => uuidv4(),
        },
        original_filename: DataTypes.STRING,
        url: DataTypes.STRING,
        secure_url: DataTypes.STRING,
        access_mode: DataTypes.STRING,
        type: DataTypes.STRING,
        size: DataTypes.BIGINT,
        resource_type: DataTypes.STRING,
        width: DataTypes.BIGINT,
        height: DataTypes.BIGINT,
        signature: DataTypes.STRING,
        version_id: DataTypes.STRING,
        version: DataTypes.BIGINT,
        level: DataTypes.BIGINT,
        asset_id: DataTypes.STRING,
        format: DataTypes.STRING,
      },
      {
        sequelize, // We need to pass the connection instance
        tableName: "files", // We need to choose the table name in database
        modelName: "file",
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
    this.belongsTo(models.Folder, { as: "folders", foreignKey: "folder_id" });
  }
}

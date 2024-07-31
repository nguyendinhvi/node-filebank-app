import { Model, DataTypes } from "sequelize";

interface FileAttributes {
  id?: number;
  file_name: string;
  file_path: string;
  file_size: string;
}

export class File extends Model<FileAttributes, FileAttributes> {
  declare id: number;

  declare file_name: string;

  declare file_path: string;

  declare file_size: string;

  static initialize = (sequelize: any) => {
    this.init(
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT.UNSIGNED,
        },
        file_name: DataTypes.STRING,
        file_path: DataTypes.STRING,
        file_size: DataTypes.STRING,
      },
      {
        sequelize, // We need to pass the connection instance
        tableName: "file", // We need to choose the table name in database
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
  }
}

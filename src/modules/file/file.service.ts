import cloudinary from "../../config/cloudinary";
import { throwError } from "../../helpers/api";
import { ResponseCode } from "../../helpers/response-codes";
import { HttpStatusCode } from "../../utils/enum";
import { File } from "./file.model";

export class FileService {
  private static _user: any;

  static get user() {
    return FileService._user;
  }

  static upload = async (payload: {
    file: Express.Multer.File;
    user_id: string;
    level: string;
    folder_id: string;
  }) => {
    try {
      const { file, user_id, level, folder_id } = payload;

      const _cloudinaryFile = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });
      const _file = await File.create({
        ..._cloudinaryFile,
        user_id,
        level: Number(level),
        size: _cloudinaryFile.bytes,
        folder_id,
      });

      return _file;
    } catch (e) {
      console.log("e :", e);
      throw e;
    }
  };

  static getMyFiles = async (where: { user_id: string; level?: string }) => {
    try {
      const _files = await File.findAll({ where });
      return _files;
    } catch (e) {
      throw e;
    }
  };

  static getFilesByFolderId = async (where: { folder_id: string }) => {
    try {
      const _files = await File.findAll({ where });
      return _files;
    } catch (e) {
      throw e;
    }
  };

  static deleteById = async (id: string, user_id: string) => {
    try {
      const _fileDelete = await File.findOne({ where: { id, user_id } });
      if (!_fileDelete)
        throwError(ResponseCode.forbidden, HttpStatusCode.FORBIDDEN);

      await cloudinary.uploader.destroy(_fileDelete?.public_id, {
        invalidate: true,
        resource_type: "raw",
      });
      await File.destroy({ where: { id } });

      return true;
    } catch (e) {
      throw e;
    }
  };
}

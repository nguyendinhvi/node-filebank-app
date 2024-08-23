import cloudinary from "../../config/cloudinary";
import { File } from "./file.model";

export class FileService {
  private static _user: any;

  static get user() {
    return FileService._user;
  }

  static upload = async (payload: { file: Express.Multer.File; user_id: string }) => {
    try {
      const { file, user_id } = payload;

      const _cloudinaryFile = await cloudinary.uploader.upload(file.path);
      const _file = await File.create({ ..._cloudinaryFile, user_id } as any);

      return _file;
    } catch (e) {
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
}

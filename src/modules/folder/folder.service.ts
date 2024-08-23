import { File } from "../file/file.model";
import { Folder, FolderAddModel } from "./folder.model";

export class FolderService {
  private static _user: any;
  static get user() {
    return FolderService._user;
  }

  static createfolder = async (payload: FolderAddModel) => {
    try {
      const res = await Folder.create(payload);
      return res;
    } catch (error) {
      throw error;
    }
  };

  static getMyFolder = async (where: { user_id: string; level: string }) => {
    try {
      const _folders = await Folder.findAll({ where });
      return _folders;
    } catch (error) {}
  };

  static getFolderById = async (id: string) => {
    try {
      const [_folder, _children] = await Promise.all([
        Folder.findOne({ where: { id } }),
        Folder.findAll({ where: { parent_id: id } }),
      ]);
      // const data = await Folder.findOne({ where: { id } });
      // const children = await Folder.findAll({ where: { parent_id: id } });

      const children = _children?.map((child) => child.toJSON());

      const result = { ..._folder.toJSON(), children };
      return result;
    } catch (error) {
      console.log("error) :", error);
    }
  };
}

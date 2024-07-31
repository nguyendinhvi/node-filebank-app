import { Folder, FolderAddModel } from "../models/schemas/folder";

export class folderService {
  private static _user: any;
  static get user() {
    return folderService._user;
  }

  static createfolder = async (payload: FolderAddModel) => {
    Folder.create(payload)
      .then((res) => {})
      .catch((e) => {
        throw e;
      });
  };

  static getMyFolder = async (user_id: string) => {
    return await Folder.findAll({ where: { user_id } });
  };

  static getFolderById = async (id: string) => {
    try {
      const data = await Folder.findOne({ where: { id } });

      return data;
    } catch (error) {
      console.log("error) :", error);
    }
  };
}

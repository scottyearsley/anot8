import { Skin } from '../models/Models.ts';

export class FileDatabase {
  static skinTable: string = './skin-table.json';
  static skins: Skin[] = new Array<Skin>();

  static initialize = async () => {
    await FileDatabase.initializeSkins();
  };

  static save = async () => {
    await Deno.writeTextFile(
      FileDatabase.skinTable,
      JSON.stringify(FileDatabase.skins)
    );
  };

  //Helpers
  private static initializeSkins = async () => {
    if (!FileDatabase.fileExists(FileDatabase.skinTable)) {
      await Deno.writeTextFile(
        FileDatabase.skinTable,
        JSON.stringify(FileDatabase.skins)
      );
      return;
    }

    const skinJson = await Deno.readTextFile(FileDatabase.skinTable);

    if (skinJson) {
      FileDatabase.skins = JSON.parse(skinJson);
    }
  };

  private static fileExists = async (file: string) => {
    try {
      const fileInfo = await Deno.stat(file);
      return fileInfo.isFile;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return false;
      } else {
        //throw error;
      }
    }
  };
}

await FileDatabase.initialize();

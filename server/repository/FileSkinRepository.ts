import { ISkinRepository } from './ISkinRepository.ts';
import { FileDatabase } from './FileDatabase.ts';
import { Skin } from '../models/Models.ts';

export class FileSkinRepository implements ISkinRepository {
  add(skin: Skin) {
    FileDatabase.skins.push(skin);
    FileDatabase.save();
    return skin;
  }

  list() {
    return FileDatabase.skins;
  }

  get(id: string) {
    const foundSkins = FileDatabase.skins.filter((skin) => skin.id === id);

    if (foundSkins && foundSkins.length > 0) {
      return foundSkins[0];
    }

    return null;
  }

  update(skin: Skin) {
    const idx = FileDatabase.skins.findIndex((s) => s.id === skin.id);

    if (idx < 0) {
      return null;
    }

    FileDatabase.skins.splice(idx, 1, skin);
    FileDatabase.save();

    return skin;
  }

  delete(id: string) {
    const idx = FileDatabase.skins.findIndex((s) => s.id === id);

    if (idx > -1) {
      const skin = FileDatabase.skins.splice(idx, 1)[0];
      FileDatabase.save();
      return skin;
    }

    return null;
  }
}

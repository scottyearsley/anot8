import { ISkinRepository } from "./ISkinRepository.ts";
import { Skin } from "../models/Skin.ts";

export class FileSkinRepository implements ISkinRepository {
  add(skin: Skin) {
    return skin;
  }

  list() {
    return new Array<Skin>();
  }

  get(id: string) {
    return { id: "abcdefg", title: "test" };
  }

  update(skin: Skin) {
    return skin;
  }

  delete(skin: Skin) {
  }
}

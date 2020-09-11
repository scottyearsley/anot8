import { Skin } from "../models/Skin.ts";

export interface ISkinRepository {
  add: (skin: Skin) => Skin;
  list: () => Skin[];
  get: (id: string) => Skin;
  update: (skin: Skin) => Skin;
  delete: (skin: Skin) => void;
}

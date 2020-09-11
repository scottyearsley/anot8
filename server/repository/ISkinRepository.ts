import { Skin } from '../models/Models.ts';

export interface ISkinRepository {
  add: (skin: Skin) => Skin;
  list: () => Skin[];
  get: (id: string) => Skin | null;
  update: (skin: Skin) => Skin | null;
  delete: (id: string) => Skin | null;
}

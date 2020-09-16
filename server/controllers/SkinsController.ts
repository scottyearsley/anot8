import { Skin } from '../models/Models.ts';
import { ISkinRepository } from '../repository/ISkinRepository.ts';

export class SkinsController {
  _skinRepository: ISkinRepository;

  constructor(skinRepository: ISkinRepository) {
    this._skinRepository = skinRepository;
  }

  list = () => {
    return this._skinRepository.list();
  };

  add = (skin: Skin) => {
    return this._skinRepository.add(skin);
  };

  get = (id: string) => {
    return this._skinRepository.get(id);
  };

  update = (skin: Skin) => {
    return this._skinRepository.update(skin);
  };

  delete = (id: string) => {
    return this._skinRepository.delete(id);
  };
}

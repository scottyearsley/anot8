import { Skin } from "../models/Skin.ts";
import { ISkinRepository } from "../repository/ISkinRepository.ts";

export class SkinsController {
  _skinRepository: ISkinRepository;

  constructor(skinRepository: ISkinRepository) {
    this._skinRepository = skinRepository;
  }

  list = () => {
    return [
      { id: "abcdefg", title: "Skinny1" },
      { id: "hijklmn", title: "Skinny2" },
    ];
  };

  add = (skin: Skin) => {
    return skin;
  };

  get = (id: string) => {
    return { id: "abcdefg", title: "Test Skin" };
  };

  update = (skin: Skin) => {
    return skin;
  };

  delete = (id: string) => {
  };
}

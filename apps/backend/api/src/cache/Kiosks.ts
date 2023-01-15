import { KioskType } from "../@types";
import { Kiosk } from "../models/KioskModel";

class KioskCache {
  private static instance: KioskCache;
  private cache: KioskType[] = [];

  private constructor() {}

  static getInstance() {
    if (!KioskCache.instance) {
      KioskCache.instance = new KioskCache();
    }
    return KioskCache.instance;
  }

  get() {
    return this.cache;
  }

  add(item: KioskType) {
    this.cache.push(item);
    this.log();
  }

  update(newItem: KioskType) {
    const newList = this.cache.map((current) => {
      if (Number(current.id) === Number(newItem.id)) return newItem;
    });
    if (newList) this.cache = newList as KioskType[];
    this.log();
  }

  delete(id: number) {
    this.cache = this.cache.filter((current) => {
      if (Number(current.id) !== id) return current;
    });
    this.log();
    return this.cache;
  }

  log() {
    console.log(`Kiosks Cache Length ${this.cache.length} => `, this.cache);
  }

  async populate() {
    this.cache = await Kiosk.findAllKiosks();
    //this.log();
  }
}

export default KioskCache;

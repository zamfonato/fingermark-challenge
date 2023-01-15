import mongoose from "mongoose";
import { KioskType } from "../@types";

const NAME = "Kiosk";
const FIELDS =
  "id serialKey description isKioskClosed storeOpensAt storeClosesAt";

const KioskSchema = new mongoose.Schema({
  id: Number,
  serialKey: String,
  description: String,
  isKioskClosed: Boolean,
  storeOpensAt: Date,
  storeClosesAt: Date,
});

const model = mongoose.model(NAME, KioskSchema);

const customMethods = {
  async findAllKiosks(): Promise<KioskType[]> {
    const query = await model.find({}, FIELDS);
    return query.map((item) => {
      const kiosk: KioskType = {
        id: item.id,
        serialKey: item.serialKey,
        description: item.description,
        isKioskClosed: item.isKioskClosed,
        storeOpensAt: item.storeOpensAt,
        storeClosesAt: item.storeClosesAt,
      };
      return kiosk;
    });
  },
  async findKioskById(id: number) {
    return await model.findOne({ id }, FIELDS);
  },
};

const merge = () => {
  return {
    model,
    ...customMethods,
  };
};

export const Kiosk = merge();

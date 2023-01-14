import { RequestHandler } from "express";

import { Kiosk } from "../@types";
import { kiosks } from "../routes/kiosk";

const Kiosk = {
  findById: (id: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {        
        const kiosk = kiosks.find((kiosk) => {
          if (Number(kiosk.id) === id) return kiosk;
        });
        resolve(kiosk);
      }, 10);
    });
  },
};

export const getKiosk: RequestHandler = async (req, res, next) => {
  try {
    const id = (!req.body.id) ? Number(req.params.id) : Number(req.body.id)
    const kiosk = await Kiosk.findById(id);
    res.locals.kiosk = kiosk;
    next();
  } catch (err: unknown) {
    res.status(500).json({ message: err instanceof Error ? err.message : "" });
  }
};

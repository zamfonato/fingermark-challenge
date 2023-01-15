import { Request, Response, Router } from "express";
import { getKiosk } from "../middleware/kiosk";
import { Kiosk } from "../models/KioskModel";
import KioskCache from "../cache/Kiosks";

const kioskRoutes = Router();

// Get them all
kioskRoutes.get("/", async (req: Request, res: Response) => {
  try {
    res.json(await Kiosk.findAllKiosks());
  } catch (err: any) {
    res.status(400).json({ message: err instanceof Error ? err.message : "" });
  }
});

// Retrieve by id
kioskRoutes.get("/:id", getKiosk, (req: Request, res: Response) => {
  if (!res.locals.kiosk) {
    return res.status(404).send({ message: "Kiosk not found" });
  }
  res.json(res.locals);
});

// Delete by id
kioskRoutes.delete("/:id", getKiosk, async (req, res) => {
  if (!res.locals.kiosk) {
    return res.status(404).send({ message: "Kiosk not found" });
  }
  try {
    const {id} = res.locals.kiosk
    Kiosk.model
      .deleteOne({ id })
      .then((result: any) => {        
        if (result.deletedCount > 0) {          
          KioskCache.getInstance().delete(id)
          res.json({ message: `Deleted Kiosk ${res.locals.kiosk.id}` });
        }
      })
      .catch((err: any) => {
        if (err) {
          res.send(err);
        }
      });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "" });
  }
});

/*

*/

// Insert a new one
kioskRoutes.post("/", getKiosk, async (req: Request, res: Response) => {
  const {
    id,
    serialKey,
    description,
    isKioskClosed,
    storeOpensAt,
    storeClosesAt,
  } = req.body;
  const { kiosk } = res.locals;
  if (kiosk && Number(kiosk.id) === Number(id)) {
    res.status(400).json({ message: "Cannot perform update like this" });
  } else {
    try {
      const newKiosk = {
        id,
        serialKey,
        description,
        isKioskClosed,
        storeOpensAt,
        storeClosesAt,
      };
      await new Kiosk.model(newKiosk).save();
      KioskCache.getInstance().add(newKiosk)
      res.status(201).json(newKiosk);
    } catch (err) {
      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : "" });
    }
  }
});

// Update
kioskRoutes.patch("/:id", getKiosk, async (req, res) => {
  if (!res.locals.kiosk) {
    return res.status(404).send({ message: "Kiosk not found" });
  }
  const { serialKey, description, isKioskClosed, storeOpensAt, storeClosesAt } =
    req.body;

  const { kiosk } = res.locals;

  if (serialKey) {
    kiosk.serialKey = serialKey;
  }
  if (description) {
    kiosk.description = description;
  }
  if (isKioskClosed !== undefined) {
    kiosk.isKioskClosed = isKioskClosed;
  }
  if (storeOpensAt) {
    kiosk.storeOpensAt = storeOpensAt;
  }
  if (storeClosesAt) {
    kiosk.storeClosesAt = storeClosesAt;
  }

  const updatedKiosk = kiosk;
  const filter = { id: kiosk.id };

  try {
    Kiosk.model
      .updateOne(filter, updatedKiosk)
      .then((result: any) => {  
        KioskCache.getInstance().update(updatedKiosk)      
        res.status(201).json(updatedKiosk);
      })
      .catch((err: any) => {
        if (err) {
          res.send(err);
        }
      });
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : "" });
  }
});

export { kioskRoutes };

import { Request, Response, Router } from "express";
import { getKiosk } from "../middleware/kiosk";
import { Kiosk } from "../@types";

let kiosks: Kiosk[] = [
  {
    id: "1",
    serialKey: "ABCDE",
    description: "DESC",
    isKioskClosed: false,
    storeOpensAt: new Date(),
    storeClosesAt: new Date(),
  },
  {
    id: "2",
    serialKey: "FGHIJ",
    description: "DESC",
    isKioskClosed: true,
    storeOpensAt: new Date(),
    storeClosesAt: new Date(),
  },
];

const kioskRoutes = Router();

// Get them all
kioskRoutes.get("/", async (req: Request, res: Response) => {
  try {
    res.json(kiosks);
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
    kiosks = kiosks.filter((kiosk) => kiosk.id !== res.locals.kiosk.id);
    res.json({ message: `Deleted Kiosk ${res.locals.kiosk.id}` });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "" });
  }
});

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
  if (kiosk && kiosk.id === id) {
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
      kiosks.push(newKiosk);
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
  if (isKioskClosed) {
    kiosk.isKioskClosed = isKioskClosed;
  }
  if (storeOpensAt) {
    kiosk.storeOpensAt = storeOpensAt;
  }
  if (storeClosesAt) {
    kiosk.storeClosesAt = storeClosesAt;
  }

  const updatedKiosk = kiosk;

  try {
    kiosks.forEach((current) => {
      if (current.id === kiosk.id) {
        current = updatedKiosk;
      }
    });

    res.status(201).json(updatedKiosk);
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : "" });
  }
});

export { kioskRoutes, kiosks };

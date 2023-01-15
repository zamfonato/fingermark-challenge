import { KioskType } from "../@types";
import KioskCache from "../cache/Kiosks";
import { Kiosk } from "../models/KioskModel";
import { isStoreOpen } from "../utils/Store";

export const processAvailabilities = (kiosks: KioskType[]): void => {
  const msg =
    kiosks.length > 1 ? "kiosks availabilities" : "kiosk availability";
  console.log(`Checking ${kiosks.length} ${msg}`);
  kiosks.forEach((kiosk: KioskType) => {
    if (!kiosk.storeOpensAt || !kiosk.storeClosesAt) return;
    const isOpen = isStoreOpen(kiosk.storeOpensAt, kiosk.storeClosesAt);
    if (kiosk.isKioskClosed === isOpen) {
      kiosk.isKioskClosed = !isOpen;
      console.log(
        `Kiosk ${kiosk.id} change state! Now it is: ${
          isOpen ? "OPEN" : "CLOSED"
        }`
      );
      const filter = { id: kiosk.id };
      Kiosk.model
        .updateOne(filter, kiosk)
        .then((result: any) => {
          KioskCache.getInstance().update(kiosk);
        })
        .catch((err: any) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      console.log("There are no changes to apply");
    }
  });
};

import KioskCache from "./Kiosks";

export const populateCache = async () => {
   await KioskCache.getInstance().populate()
   // more future items here...
};

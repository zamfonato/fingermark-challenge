import cron from "node-cron";
import KioskCache from "../cache/Kiosks";
import { processAvailabilities } from "./availability-task";

const everyMinuteJob = cron.schedule("*/60 * * * * *", function () {
  processAvailabilities(KioskCache.getInstance().get());
  // more future items here...
});

export const initJobs = () => {
  everyMinuteJob.start();
};

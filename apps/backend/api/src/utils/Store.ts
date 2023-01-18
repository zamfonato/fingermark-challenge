import moment from "moment";

moment.locale("pt-br");

export const isStoreOpen = (
  storeOpensAt: Date,
  storeClosesAt: Date
): boolean => {
  try {
    let currentDate = moment();
    // This will remove timezone
    let opensAt = moment(storeOpensAt, "YYYY-MM-DDTHH:mm:ss");
    let closesAt = moment(storeClosesAt, "YYYY-MM-DDTHH:mm:ss");
    // This will set the same date for comparsion
    opensAt.date( currentDate.date() )
    closesAt.date( currentDate.date() )
    // Check if is inside of the range
    return currentDate.isBetween(opensAt, closesAt, "minutes", "[]");
  } catch (err) {
    console.log("isStoreOpen error: ", err);
    return false;    
  }
};
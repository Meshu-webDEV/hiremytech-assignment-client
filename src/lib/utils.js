import dayjs from "dayjs";

export function formatDate(date, withTime = true) {
  try {
    if (!withTime) return dayjs(date).format("DD/MM/YYYY");
    return dayjs(date).format("DD/MM/YYYY hh:mm A");
  } catch (error) {
    console.log("error formatting date", error.message);
    return "Error formatting";
  }
}

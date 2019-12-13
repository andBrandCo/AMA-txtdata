const { utcToZonedTime, format } = require("date-fns-tz");

exports.getFormattedDate = date => {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return day + "." + month + "." + year;
};

exports.getLocalTZFormattedDate = date => {
  const timeZone = "America/Chicago";
  const zonedDate = utcToZonedTime(date, timeZone);
  const pattern = "dd/MM/yyyy: HH-mm";
  return format(zonedDate, pattern);
};

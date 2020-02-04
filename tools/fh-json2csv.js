const Json2csvParser = require("json2csv").Parser;
// const { utcToZonedTime, format } = require("date-fns-tz");
const { getLocalTZFormattedDate } = require("./formattedDate");

exports.convertToCSV = data => {
  let jsonList = JSON.parse(JSON.stringify(data));
  jsonList.map(elem => {
    const date = getLocalTZFormattedDate(elem.createdAt);
    elem.createdAt = date;
    return elem;
  });

  const fields = [
    "mobileNumber",
    "phoneID",
    {
      label: "auto response",
      value: "autoResponse",
      default: ""
    },
    "urlSent",
    "keyword",
    {
      label: "created at",
      value: "createdAt",
      default: ""
    }
  ];

  const json2csvParser = new Json2csvParser({ fields, delimiter: '\t' });
  const tsv = json2csvParser.parse(jsonList);
  return tsv;
};

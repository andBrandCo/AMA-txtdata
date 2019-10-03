const Json2csvParser = require("json2csv").Parser;

exports.convertToCSV = data => {
  const jsonList = JSON.parse(JSON.stringify(data));
  //   console.log("jsonList - ", jsonList);

  const csvFields = [
    "id",
    "mobileNumber",
    "phoneID",
    "autoResponse",
    "urlSent",
    "keyword",
    "createdAt"
  ];
  const json2csvParser = new Json2csvParser({ csvFields });
  return json2csvParser.parse(jsonList);
};

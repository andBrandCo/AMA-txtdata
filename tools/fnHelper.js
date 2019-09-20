const createURLFromParts = (arrConst, arrLet, id) => {
  const finalString = `${arrConst[0]}${arrLet[0]}${arrConst[1]}${arrLet[1]}${
    arrConst[2]
  }${arrLet[2]}${arrConst[3]}${id}`;
  return finalString;
};

module.exports = {
  createURLFromParts
};

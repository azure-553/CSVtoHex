export default function charCodeAtValue(arrCsvContentHex, vlaue) {
  vlaue.forEach((element) => {
    const vlaueHex = element.charCodeAt();
    arrCsvContentHex.push(vlaueHex);
  });

  return arrCsvContentHex;
}

export default function parseIntValue(arrCsvContentHex, value) {
  value.forEach((element) => {
    const valueHex = parseInt(element, 10);
    arrCsvContentHex.push(valueHex);
  });

  return arrCsvContentHex;
}

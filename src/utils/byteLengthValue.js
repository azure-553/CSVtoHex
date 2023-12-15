export default function byteLengthValue(arrCsvContentHex, value) {
  const valueHex = parseInt(value, 10);
  arrCsvContentHex.push(valueHex);
  const valueHexLength = valueHex.toString(16).length;
  if (valueHexLength < 4) {
    for (let i = 1; i < 4 - valueHexLength; i++) {
      arrCsvContentHex.push(parseInt(0, 10));
    }
  }

  return arrCsvContentHex;
}

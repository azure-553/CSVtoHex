export default function extendsAsciiValue(arrCsvContentHex, value) {
  const valueHex = parseInt(value, 10);
  if (valueHex > 255) {
    const high = valueHex >> 8;
    const low = valueHex & 0xff;
    arrCsvContentHex.push(low);
    arrCsvContentHex.push(high);
  }
  return arrCsvContentHex;
}

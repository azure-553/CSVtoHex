export default function floatHexValue(arrCsvContentHex, value) {
  const valueHex = parseFloat(value);

  let floatArr = new Float64Array(1);
  floatArr[0] = valueHex;

  let barr = new Int8Array(floatArr.buffer);

  for (let i = 0; i < barr.length; i++) {
    arrCsvContentHex.push(barr[i]);
  }

  return arrCsvContentHex;
}

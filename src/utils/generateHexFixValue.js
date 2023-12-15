export default function generateHexFixValue(arrCsvContentHex, value, fixValue) {
  value.split('').forEach((element) => {
    arrCsvContentHex.push(element.charCodeAt());
  });

  fixValue.forEach((element) => {
    arrCsvContentHex.push(parseInt(element, 10));
  });

  return arrCsvContentHex;
}

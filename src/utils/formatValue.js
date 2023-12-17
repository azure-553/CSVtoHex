import { formats } from './formats';

export default function formatValue(arrCsvContentHex, format) {
  let formatHex = '';
  const formatHexFixValue = parseInt(0, 10);

  switch (format) {
    case formats.formatJ:
      formatHex = 'J';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatI:
      formatHex = 'I';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatK:
      formatHex = 'K';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatU:
      formatHex = 'U';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatV:
      formatHex = 'V';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatW:
      formatHex = 'W';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatF:
      formatHex = 'F';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatD:
      formatHex = 'D';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
    case formats.formatB:
      formatHex = 'B';
      arrCsvContentHex.push(formatHex.charCodeAt());
      arrCsvContentHex.push(formatHexFixValue);
      break;
  }

  return arrCsvContentHex;
}

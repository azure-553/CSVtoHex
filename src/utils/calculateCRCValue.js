import { crc16 } from './crc16';

export default function calculateCRCValue(arrCsvContentHex) {
  const crc16Array = arrCsvContentHex.slice(10);
  const crcValue = crc16(Uint8Array.from(crc16Array));

  const valueHex = parseInt(crcValue, 10);
  if (valueHex > 255) {
    const high = valueHex >> 8;
    const low = valueHex & 0xff;
    arrCsvContentHex.splice(66, 0, low);
    arrCsvContentHex.splice(67, 0, high);
  }

  return arrCsvContentHex;
}

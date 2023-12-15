import { BLOB_TYPE } from '../constants';

export default function generateBlob(arrCsvContentHex) {
  let textArea = arrCsvContentHex;
  let arrayBuffer = new ArrayBuffer(textArea.length);
  let unitArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < textArea.length; i++) {
    unitArray[i] = textArea[i];
  }

  let blob = new Blob([unitArray], { type: BLOB_TYPE });

  return blob;
}

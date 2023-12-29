import { useState } from 'react';
import {
  generateHexFixValue,
  parseIntValue,
  extendsAsciiValue,
  charCodeAtValue,
  formatValue,
  floatHexValue,
  byteLengthValue,
  generateBlob,
  calculateCRCValue,
  csvToJSON,
  splitValue,
  fileExtensionValid,
} from 'utils';
import {
  header,
  headerFixValue,
  username,
  usernameFixValue,
  version,
  versionFixValue,
  mapType,
  reservedFixValue,
  finish,
  finishFixValue,
} from 'utils/fixValue';
import {
  DEVICE_MAX_BYTE,
  ERROR,
  SEQ_MAX_BYTE,
  SUGGEST_FILENAME,
  MSGLENGTH_ONE,
  SCALE_MAX_BYTE,
  MAX_FILE_SIZE,
} from 'constants';

export default function useFile() {
  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState(null);
  const [isFile, setIsFile] = useState(true);
  const [isChanged, setIsChanged] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const stringUploadInfo = String(uploadedInfo);
  let csvContent = csvToJSON(stringUploadInfo);

  const hexValueArr = [];
  const childStructureArr = [];

  generateHexFixValue(hexValueArr, header, headerFixValue);
  generateHexFixValue(hexValueArr, username, usernameFixValue);
  generateHexFixValue(hexValueArr, version, versionFixValue);

  hexValueArr.push(mapType.charCodeAt());
  hexValueArr.push(parseInt(reservedFixValue, 10));

  csvContent.map((item) => {
    const seq = splitValue(item.seq);
    const deviceId = splitValue(item.device_id);
    const tagCode = item.tag_code;
    const reqSet = splitValue(item.req_set);
    const func = splitValue(item.func);
    const unitId = splitValue(item.unit_id);
    const reserved = splitValue(item.Reserved);
    const address = item.address;
    const endian = splitValue(item.endian);
    const wordcnt = splitValue(item.wordcnt);
    const format = item.format;
    const scale = item.scale;
    const useFlag = splitValue(item.Use_flag);
    const port = splitValue(item.Port);

    parseIntValue(hexValueArr, seq);
    if (seq.length < SEQ_MAX_BYTE) {
      hexValueArr.push(parseInt(0, 10));
    }
    childStructureArr.push(Number(seq));

    charCodeAtValue(hexValueArr, deviceId);
    if (deviceId.length < DEVICE_MAX_BYTE) {
      for (let i = 0; i < DEVICE_MAX_BYTE - deviceId.length; i++) {
        hexValueArr.push(parseInt(0, 10));
      }
    }

    if (!isNaN(tagCode)) {
      extendsAsciiValue(hexValueArr, tagCode);
    }

    parseIntValue(hexValueArr, reqSet);
    parseIntValue(hexValueArr, func);
    parseIntValue(hexValueArr, unitId);
    parseIntValue(hexValueArr, reserved);

    byteLengthValue(hexValueArr, address);
    charCodeAtValue(hexValueArr, endian);
    parseIntValue(hexValueArr, wordcnt);
    formatValue(hexValueArr, format);

    floatHexValue(hexValueArr, scale);
    if (String(scale).length <= SCALE_MAX_BYTE) {
      for (let i = String(scale).length; i < SCALE_MAX_BYTE + 1; i++) {
        hexValueArr.push(parseInt(0, 10));
      }
    }

    parseIntValue(hexValueArr, useFlag);
    parseIntValue(hexValueArr, port);
  });

  const childStructureValue = Math.max(...childStructureArr);
  const msgLength = MSGLENGTH_ONE * childStructureValue;

  hexValueArr.splice(62, 0, msgLength);
  if (String(msgLength).length < 4) {
    hexValueArr.splice(63, 0, parseInt(0, 10));
  }

  hexValueArr.splice(64, 0, parseInt(childStructureValue, 10));
  if (String(childStructureValue).length < 4) {
    hexValueArr.splice(65, 0, parseInt(0, 10));
  }

  calculateCRCValue(hexValueArr);
  generateHexFixValue(hexValueArr, finish, finishFixValue);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (e) => e.preventDefault();

  const setFileInfo = (file) => {
    try {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        setUploadedInfo(fileReader.result);
      };
      fileReader.readAsText(file);
    } catch (error) {
      console.log(ERROR.CHOOSE);
    }
  };

  const handleDrop = (e) => {
    try {
      e.preventDefault();
      setActive(false);

      const file = e.dataTransfer.files[0];

      // 파일 확장자 체크
      if (!fileExtensionValid(file)) {
        e.target.value = '';
        alert(ERROR.EXTENSION);
        return;
      }

      // 파일 용량 체크
      if (file.size > MAX_FILE_SIZE) {
        e.target.value = '';
        alert(ERROR.MAX);
        return;
      }
      setFileInfo(file);
      setIsFile(false);

      if (file.size === 0) {
        alert(ERROR.DATA);
        return setActive(false);
      }
    } catch (error) {
      alert(ERROR.DATA);
    }
  };

  const handleUpload = ({ target }) => {
    try {
      const file = target.files[0];
      setFileInfo(file);
      console.log(file);

      if (file.size === 0) {
        alert(ERROR.DATA);
        return setActive(false);
      }

      // 파일 확장자 체크
      if (!fileExtensionValid(file)) {
        target.value = '';
        alert(ERROR.EXTENSION);
        return;
      }

      // 파일 용량 체크
      if (file.size > MAX_FILE_SIZE) {
        target.value = '';
        alert(ERROR.MAX);
        return;
      }

      setIsFile(false);
    } catch (error) {
      alert(ERROR.DATA);
    }
  };

  const handleFileChange = () => {
    setIsFile(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsChanged(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileDownload = async () => {
    try {
      let tempLink = document.createElement('a');
      tempLink.setAttribute(
        'href',
        URL.createObjectURL(generateBlob(hexValueArr)),
      );
      tempLink.setAttribute('download', SUGGEST_FILENAME);
      tempLink.click();
      URL.revokeObjectURL(tempLink.href);
    } catch (error) {
      alert(ERROR.SAVE);
    }
  };

  return {
    isActive,
    uploadedInfo,
    isFile,
    isChanged,
    isLoading,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleUpload,
    handleFileChange,
    handleFileDownload,
  };
}

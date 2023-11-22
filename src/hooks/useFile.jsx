import { useState } from 'react'
import csvToJSON from '../utils/csvToJson'
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
} from '../utils/fixValue'
import generateHexFixValue from '../utils/generateHexFixValue'
import parseIntValue from '../utils/parseIntValue'
import extendsAsciiValue from '../utils/extendsAsciiValue'
import charCodeAtValue from '../utils/charCodeAtValue'
import formatValue from '../utils/formatValue'
import floatHexValue from '../utils/floatHexValue'
import byteLengthValue from '../utils/byteLengthValue'
import {
  DEVICE_MAX_BYTE,
  ERROR,
  SEQ_MAX_BYTE,
  SUGGEST_FILENAME,
  MSGLENGTH_ONE,
  SCALE_MAX_BYTE,
} from '../constants'
import generateBlob from '../utils/generateBlob'
import { crc16 } from '../utils/crc16'

export default function useFile() {
  const [isActive, setActive] = useState(false)
  const [uploadedInfo, setUploadedInfo] = useState(null)
  const [isFile, setIsFile] = useState(true)
  const [isChanged, setIsChanged] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)

  let arrCsvContentHex = []
  let calculateCRCArray = []

  // header 10
  generateHexFixValue(arrCsvContentHex, header, headerFixValue)

  // username 40
  generateHexFixValue(arrCsvContentHex, username, usernameFixValue)
  generateHexFixValue(calculateCRCArray, username, usernameFixValue)

  // version 10
  generateHexFixValue(arrCsvContentHex, version, versionFixValue)
  generateHexFixValue(calculateCRCArray, version, versionFixValue)

  // mapType 1
  arrCsvContentHex.push(mapType.charCodeAt())
  // reserved 1
  arrCsvContentHex.push(parseInt(reservedFixValue, 10))

  calculateCRCArray.push(mapType.charCodeAt())
  calculateCRCArray.push(parseInt(reservedFixValue, 10))
  // console.log(calculateCRCArray)
  // console.log(arrCsvContentHex)

  let childStructureArr = []

  csvContent.map((item) => {
    const seq = (item.seq || '').split('')
    const deviceId = (item.device_id || '').split('')
    const tagCode = item.tag_code
    const reqSet = (item.req_set || '').split('')
    const func = (item.func || '').split('')
    const unitId = (item.unit_id || '').split('')
    const reserved = (item.Reserved || '').split('')
    const address = item.address
    const endian = (item.endian || '').split('')
    const wordcnt = (item.wordcnt || '').split('')
    const format = item.format
    const scale = item.scale
    const useFlag = (item.Use_flag || '').split('')
    const port = (item.Port || '').split('')

    parseIntValue(arrCsvContentHex, seq)
    parseIntValue(calculateCRCArray, seq)
    if (seq.length < SEQ_MAX_BYTE) {
      arrCsvContentHex.push(parseInt(0, 10))
      calculateCRCArray.push(parseInt(0, 10))
    }
    childStructureArr.push(Number(seq))
    // console.log(calculateCRCArray)
    // console.log(arrCsvContentHex)

    charCodeAtValue(arrCsvContentHex, deviceId)
    charCodeAtValue(calculateCRCArray, deviceId)
    if (deviceId.length < DEVICE_MAX_BYTE) {
      for (let i = 0; i < DEVICE_MAX_BYTE - deviceId.length; i++) {
        arrCsvContentHex.push(parseInt(0, 10))
        calculateCRCArray.push(parseInt(0, 10))
      }
    }

    if (!isNaN(tagCode)) {
      extendsAsciiValue(arrCsvContentHex, tagCode)
      extendsAsciiValue(calculateCRCArray, tagCode)
    }

    // console.log(calculateCRCArray)
    // console.log(arrCsvContentHex)

    parseIntValue(arrCsvContentHex, reqSet)
    parseIntValue(arrCsvContentHex, func)
    parseIntValue(arrCsvContentHex, unitId)
    parseIntValue(arrCsvContentHex, reserved)

    parseIntValue(calculateCRCArray, reqSet)
    parseIntValue(calculateCRCArray, func)
    parseIntValue(calculateCRCArray, unitId)
    parseIntValue(calculateCRCArray, reserved)

    // console.log(calculateCRCArray)
    // console.log(arrCsvContentHex)

    byteLengthValue(arrCsvContentHex, address)
    byteLengthValue(calculateCRCArray, address)

    charCodeAtValue(arrCsvContentHex, endian)
    charCodeAtValue(calculateCRCArray, endian)

    parseIntValue(arrCsvContentHex, wordcnt)
    parseIntValue(calculateCRCArray, wordcnt)

    formatValue(arrCsvContentHex, format)
    formatValue(calculateCRCArray, format)

    floatHexValue(arrCsvContentHex, scale)
    floatHexValue(calculateCRCArray, scale)
    for (let i = 0; i < SCALE_MAX_BYTE; i++) {
      arrCsvContentHex.push(parseInt(0, 10))
      calculateCRCArray.push(parseInt(0, 10))
    }

    parseIntValue(arrCsvContentHex, useFlag)
    parseIntValue(arrCsvContentHex, port)

    parseIntValue(calculateCRCArray, useFlag)
    parseIntValue(calculateCRCArray, port)
  })

  // console.log(arrCsvContentHex);
  // console.log(calculateCRCArray);

  const childStructureValue = Math.max(...childStructureArr)
  const msgLength = MSGLENGTH_ONE * childStructureValue

  arrCsvContentHex.splice(62, 0, msgLength)
  if (String(msgLength).length < 4) {
    arrCsvContentHex.splice(63, 0, parseInt(0, 10))
  }

  arrCsvContentHex.splice(64, 0, parseInt(childStructureValue, 10))
  if (String(childStructureValue).length < 4) {
    arrCsvContentHex.splice(65, 0, parseInt(0, 10))
  }

  calculateCRCArray.splice(52, 0, msgLength)
  if (String(msgLength).length < 4) {
    calculateCRCArray.splice(53, 0, parseInt(0, 10))
  }

  calculateCRCArray.splice(54, 0, parseInt(childStructureValue, 10))
  if (String(childStructureValue).length < 4) {
    calculateCRCArray.splice(65, 0, parseInt(0, 10))
  }

  // console.log(calculateCRCArray)
  console.log(arrCsvContentHex.length)

  // TODO: CRC값 계산해서 넣기
  // modbus 16type
  // const modbus = crc16(Uint8Array.from(calculateCRCArray)).toString(16)
  // console.log(modbus);
  // arrCsvContentHex.splice(64, 0, modbus)

  // TODO: 모두 다 끝나고 찍히는 0 제거하기
  console.log(arrCsvContentHex)
  // arrCsvContentHex.splice(101, 141)
  console.log(arrCsvContentHex)
  // console.log(calculateCRCArray)

  // generateHexFixValue(arrCsvContentHex, finish, finishFixValue)
  // console.log(arrCsvContentHex)
  // console.log(calculateCRCArray)

  const handleDragStart = () => setActive(true)
  const handleDragEnd = () => setActive(false)
  const handleDragOver = (e) => e.preventDefault()

  const setFileInfo = (file) => {
    try {
      let fileReader = new FileReader()
      fileReader.onload = () => {
        setUploadedInfo(fileReader.result)
      }
      fileReader.readAsText(file)
    } catch (error) {
      console.log(ERROR.CHOOSE)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setActive(false)

    const file = e.dataTransfer.files[0]
    setFileInfo(file)
    setIsFile(false)
  }

  const handleUpload = ({ target }) => {
    const file = target.files[0]
    setFileInfo(file)
    setIsFile(false)
  }

  const handleFileChange = () => {
    console.log('FileChangeBtn Clicked')
    setIsFile(true)
    setIsLoading(true)
    setTimeout(() => {
      setIsChanged(false)
      setIsLoading(false)
    }, 2000)
  }

  const handleFileDownload = async () => {
    try {
      console.log('FileDownBtn Clicked')
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: SUGGEST_FILENAME,
      })
      const fileStream = await fileHandle.createWritable()

      await fileStream.write(generateBlob(arrCsvContentHex))
      await fileStream.close()
    } catch (error) {
      alert(ERROR.SAVE)
    }
  }

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
  }
}

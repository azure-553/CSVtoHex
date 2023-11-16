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
  SEQ_MEX_BYTE,
  SUGGEST_FILENAME,
} from '../constants'
import generateBlob from '../utils/generateBlob'

export default function useFile() {
  const [isActive, setActive] = useState(false)
  const [uploadedInfo, setUploadedInfo] = useState(null)
  const [isFile, setIsFile] = useState(true)
  const [isChanged, setIsChanged] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)

  let arrCsvContentHex = []
  generateHexFixValue(arrCsvContentHex, header, headerFixValue)
  generateHexFixValue(arrCsvContentHex, username, usernameFixValue)
  generateHexFixValue(arrCsvContentHex, version, versionFixValue)
  arrCsvContentHex.push(mapType.charCodeAt())
  arrCsvContentHex.push(parseInt(reservedFixValue, 10))
  // TODO: MsgLength 넣기
  // TODO: child structure 값 넣기
  // TODO: CRC값 계산해서 넣기
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
    if (seq.length < SEQ_MEX_BYTE) {
      arrCsvContentHex.push(parseInt(0, 10))
    }
    childStructureArr.push(Number(seq))

    charCodeAtValue(arrCsvContentHex, deviceId)
    if (deviceId.length < DEVICE_MAX_BYTE) {
      for (let i = 0; i < DEVICE_MAX_BYTE - deviceId.length; i++) {
        arrCsvContentHex.push(parseInt(0, 10))
      }
    }

    if (!isNaN(tagCode)) {
      extendsAsciiValue(arrCsvContentHex, tagCode)
    }

    parseIntValue(arrCsvContentHex, reqSet)
    parseIntValue(arrCsvContentHex, func)
    parseIntValue(arrCsvContentHex, unitId)
    parseIntValue(arrCsvContentHex, reserved)

    byteLengthValue(arrCsvContentHex, address)

    charCodeAtValue(arrCsvContentHex, endian)

    parseIntValue(arrCsvContentHex, wordcnt)

    formatValue(arrCsvContentHex, format)

    floatHexValue(arrCsvContentHex, scale)

    parseIntValue(arrCsvContentHex, useFlag)
    parseIntValue(arrCsvContentHex, port)
  })
  console.log(Math.max(...childStructureArr));

  // TODO : 모두 다 끝나고 찍히는 0 제거하기
  // arrCsvContentHex.splice(97, 141)

  generateHexFixValue(arrCsvContentHex, finish, finishFixValue)

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

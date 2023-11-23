import { useState } from 'react'
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
} from '../utils'
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
import {
  DEVICE_MAX_BYTE,
  ERROR,
  SEQ_MAX_BYTE,
  SUGGEST_FILENAME,
  MSGLENGTH_ONE,
  SCALE_MAX_BYTE,
} from '../constants'

export default function useFile() {
  const [isActive, setActive] = useState(false)
  const [uploadedInfo, setUploadedInfo] = useState(null)
  const [isFile, setIsFile] = useState(true)
  const [isChanged, setIsChanged] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)

  const hexValueArr = []
  const childStructureArr = []

  generateHexFixValue(hexValueArr, header, headerFixValue)
  generateHexFixValue(hexValueArr, username, usernameFixValue)
  generateHexFixValue(hexValueArr, version, versionFixValue)

  hexValueArr.push(mapType.charCodeAt())
  hexValueArr.push(parseInt(reservedFixValue, 10))

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

    parseIntValue(hexValueArr, seq)
    if (seq.length < SEQ_MAX_BYTE) {
      hexValueArr.push(parseInt(0, 10))
    }
    childStructureArr.push(Number(seq))

    charCodeAtValue(hexValueArr, deviceId)
    if (deviceId.length < DEVICE_MAX_BYTE) {
      for (let i = 0; i < DEVICE_MAX_BYTE - deviceId.length; i++) {
        hexValueArr.push(parseInt(0, 10))
      }
    }

    if (!isNaN(tagCode)) {
      extendsAsciiValue(hexValueArr, tagCode)
    }

    parseIntValue(hexValueArr, reqSet)
    parseIntValue(hexValueArr, func)
    parseIntValue(hexValueArr, unitId)
    parseIntValue(hexValueArr, reserved)

    byteLengthValue(hexValueArr, address)
    charCodeAtValue(hexValueArr, endian)
    parseIntValue(hexValueArr, wordcnt)
    formatValue(hexValueArr, format)

    floatHexValue(hexValueArr, scale)
    for (let i = 0; i < SCALE_MAX_BYTE; i++) {
      hexValueArr.push(parseInt(0, 10))
    }

    parseIntValue(hexValueArr, useFlag)
    parseIntValue(hexValueArr, port)
  })

  const childStructureValue = Math.max(...childStructureArr)
  const msgLength = MSGLENGTH_ONE * childStructureValue

  hexValueArr.splice(62, 0, msgLength)
  if (String(msgLength).length < 4) {
    hexValueArr.splice(63, 0, parseInt(0, 10))
  }

  hexValueArr.splice(64, 0, parseInt(childStructureValue, 10))
  if (String(childStructureValue).length < 4) {
    hexValueArr.splice(65, 0, parseInt(0, 10))
  }

  calculateCRCValue(hexValueArr)
  generateHexFixValue(hexValueArr, finish, finishFixValue)

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
    setIsFile(true)
    setIsLoading(true)
    setTimeout(() => {
      setIsChanged(false)
      setIsLoading(false)
    }, 2000)
  }

  const handleFileDownload = async () => {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: SUGGEST_FILENAME,
      })
      const fileStream = await fileHandle.createWritable()
      await fileStream.write(generateBlob(hexValueArr))
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

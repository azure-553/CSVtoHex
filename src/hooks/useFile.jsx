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
  generateHexFixValue(arrCsvContentHex, version, versionFixValue)
  generateHexFixValue(arrCsvContentHex, username, usernameFixValue)
  arrCsvContentHex.push(mapType.charCodeAt())
  arrCsvContentHex.push(parseInt(reservedFixValue, 10))
  // TODO: CRC값 계산해서 넣기
  // TODO: child structure 값 넣기
  // TODO: MsgLenght 넣기

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
    if (seq.length < 2) {
      arrCsvContentHex.push(parseInt(0, 10))
    }

    charCodeAtValue(arrCsvContentHex, deviceId)
    if (deviceId.length < 16) {
      for (let i = 0; i < 16 - deviceId.length; i++) {
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

  // TODO : 모두 다 끝나고 찍히는 0 제거하기
  arrCsvContentHex.splice(97, 141)

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
      console.log('[ERROR] 파일을 선택해주세요.')
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

      let textArea = arrCsvContentHex
      let arrayBuffer = new ArrayBuffer(textArea.length)
      let unitArray = new Uint8Array(arrayBuffer)

      for (let i = 0; i < textArea.length; i++) {
        unitArray[i] = textArea[i]
      }

      let blob = new Blob([unitArray], { type: 'application/octet-stream' })

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'MCFG_NEW_HEAT.MBC',
      })
      const fileStream = await fileHandle.createWritable()

      await fileStream.write(blob)
      await fileStream.close()
    } catch (error) {
      alert('[ERROR] 파일을 저장해주세요.')
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

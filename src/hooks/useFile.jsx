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
import { formats } from '../utils/formats'
import generateHexFixValue from '../utils/generateHexFixValue'
import parseIntValue from '../utils/parseIntValue'
import extendsAsciiValue from '../utils/extendsAsciiValue'

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

    deviceId.forEach((element) => {
      const deviceIdHex = element.charCodeAt()
      arrCsvContentHex.push(deviceIdHex)
    })

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

    const addressHex = parseInt(address, 10)
    arrCsvContentHex.push(addressHex)
    const addressHexLength = addressHex.toString(16).length
    if (addressHexLength < 4) {
      for (let i = 1; i < 4 - addressHexLength; i++) {
        arrCsvContentHex.push(parseInt(0, 10))
      }
    }

    endian.forEach((element) => {
      const endianHex = element.charCodeAt()
      arrCsvContentHex.push(endianHex)
    })

    parseIntValue(arrCsvContentHex, wordcnt)

    let formatHex = ''
    const formatHexFixValue = parseInt(0, 10)

    switch (format) {
      case formats.formatJ:
        formatHex = 'J'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatI:
        formatHex = 'I'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatK:
        formatHex = 'K'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatU:
        formatHex = 'U'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatV:
        formatHex = 'V'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatW:
        formatHex = 'W'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatF:
        formatHex = 'F'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatD:
        formatHex = 'D'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
      case formats.formatB:
        formatHex = 'B'
        arrCsvContentHex.push(formatHex.charCodeAt() + formatHexFixValue)
        break
    }

    const scaleHex = parseFloat(scale)

    let floatArr = new Float32Array(1)
    floatArr[0] = scaleHex

    let barr = new Int8Array(floatArr.buffer)

    for (let i = 0; i < barr.length; i++) {
      arrCsvContentHex.push(barr[i])
    }

    parseIntValue(arrCsvContentHex, useFlag)
    parseIntValue(arrCsvContentHex, port)
  })

  // TODO : 모두 다 끝나고 찍히는 0 제거하기
  arrCsvContentHex.splice(97, 141)
  console.log(arrCsvContentHex)

  generateHexFixValue(arrCsvContentHex, finish, finishFixValue)
  let newArrCsvContent = arrCsvContentHex

  const handleDragStart = () => setActive(true)
  const handleDragEnd = () => setActive(false)
  const handleDragOver = (event) => {
    event.preventDefault()
  }

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

  const handleDrop = (event) => {
    event.preventDefault()
    setActive(false)

    const file = event.dataTransfer.files[0]
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

      let textArea = newArrCsvContent
      let arrayBuffer = new ArrayBuffer(textArea.length)
      let ia = new Uint8Array(arrayBuffer)

      for (let i = 0; i < textArea.length; i++) {
        ia[i] = textArea[i]
      }

      let blob = new Blob([ia], { type: 'application/octet-stream' })

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

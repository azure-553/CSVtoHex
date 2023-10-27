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

export default function useFile() {
  const [isActive, setActive] = useState(false)
  const [uploadedInfo, setUploadedInfo] = useState(null)
  const [isFile, setIsFile] = useState(true)
  const [isChanged, setIsChanged] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)

  let arrCsvContentHex = []
  arrCsvContentHex.push(header + headerFixValue)
  arrCsvContentHex.push(username + usernameFixValue)
  arrCsvContentHex.push(version + versionFixValue)
  arrCsvContentHex.push(mapType + reservedFixValue)

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
    const scale = (item.scale || '').split('')
    const useFlag = (item.Use_flag || '').split('')
    const port = (item.Port || '').split('')

    seq.forEach((element) => {
      const seqHex = String.fromCharCode(element)
      arrCsvContentHex.push(seqHex)
    })

    if (seq.length < 2) {
      arrCsvContentHex.push(String.fromCharCode(0))
    }

    deviceId.forEach((element) => {
      const deviceIdHex = element
      arrCsvContentHex.push(deviceIdHex)
    })

    if (deviceId.length < 16) {
      for (let i = 0; i < 16 - deviceId.length; i++) {
        arrCsvContentHex.push(String.fromCharCode(0))
      }
    }

    // 임시로!
    const tagCodeHex = String.fromCharCode(tagCode)
    arrCsvContentHex.push(tagCodeHex)

    reqSet.forEach((element) => {
      const reqSetHex = String.fromCharCode(element)
      arrCsvContentHex.push(reqSetHex)
    })

    func.forEach((element) => {
      const funcHex = String.fromCharCode(element)
      arrCsvContentHex.push(funcHex)
    })

    unitId.forEach((element) => {
      const unitIdHex = String.fromCharCode(element)
      arrCsvContentHex.push(unitIdHex)
    })

    reserved.forEach((element) => {
      const reservedHex = String.fromCharCode(element)
      arrCsvContentHex.push(reservedHex)
    })

    const addressHex = String.fromCharCode(address)
    arrCsvContentHex.push(addressHex)

    endian.forEach((element) => {
      const endianHex = element
      arrCsvContentHex.push(endianHex)
    })

    wordcnt.forEach((element) => {
      const wordcntHex = String.fromCharCode(element)
      arrCsvContentHex.push(wordcntHex)
    })

    let formatHex = ''
    const formatHexFixValue = String.fromCharCode(0)

    switch (format) {
      case formats.formatJ:
        formatHex = 'J'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatI:
        formatHex = 'I'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatK:
        formatHex = 'K'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatU:
        formatHex = 'U'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatV:
        formatHex = 'V'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatW:
        formatHex = 'W'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatF:
        formatHex = 'F'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatD:
        formatHex = 'D'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
      case formats.formatB:
        formatHex = 'B'
        arrCsvContentHex.push(formatHex + formatHexFixValue)
        break
    }

    scale.forEach((element) => {
      const scaleHex = String.fromCharCode(element)
      arrCsvContentHex.push(scaleHex)
    })

    useFlag.forEach((element) => {
      const useFlagHex = String.fromCharCode(element)
      arrCsvContentHex.push(useFlagHex)
    })

    port.forEach((element) => {
      const portHex = String.fromCharCode(element)
      arrCsvContentHex.push(portHex)
    })

    // TODO : 모두 다 끝나고 찍히는 0 제거하기
    arrCsvContentHex.splice(40,37)
  })
  console.log(arrCsvContentHex)
  arrCsvContentHex.push(finish + finishFixValue)
  let newArrCsvContent = arrCsvContentHex.join('')

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
      let blob = new Blob([textArea], {
        type: 'octet/stream;charset=euc-kr(CP949)',
      })
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

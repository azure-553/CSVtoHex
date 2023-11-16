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
  header
    .split('')
    .forEach((element) => arrCsvContentHex.push(element.charCodeAt()))
  headerFixValue.forEach((element) =>
    arrCsvContentHex.push(parseInt(element, 10)),
  )
  username
    .split('')
    .forEach((element) => arrCsvContentHex.push(element.charCodeAt()))
  usernameFixValue.forEach((element) =>
    arrCsvContentHex.push(parseInt(element, 10)),
  )
  version
    .split('')
    .forEach((element) => arrCsvContentHex.push(element.charCodeAt()))
  versionFixValue.forEach((element) => {
    arrCsvContentHex.push(parseInt(element, 10))
  })
  arrCsvContentHex.push(mapType.charCodeAt())
  arrCsvContentHex.push(parseInt(reservedFixValue, 10))

  // TODO: CRC값 계산해서 넣기
  // TODO: child structure 값 넣기
  // TODO: MsgLenght 넣기
  // TODO: 비동기처리로 인해 생기는 0 처리해주기

  csvContent.map((x) => {
    if (x.seq === 0) {
      console.log(x.seq)
      // if(byteLength(seq) < 4){
      //   arrCsvContentHex.push(0)
      // }
    }
  })

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

    seq.forEach((element) => {
      const seqHex = parseInt(element, 10)
      arrCsvContentHex.push(seqHex)
    })

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
      const tagCodeHex = parseInt(tagCode, 10)
      if (tagCodeHex > 255) {
        let high = tagCodeHex >> 8
        let low = tagCodeHex & 0xff
        arrCsvContentHex.push(low)
        arrCsvContentHex.push(high)
      }
    }

    reqSet.forEach((element) => {
      const reqSetHex = parseInt(element, 10)
      arrCsvContentHex.push(reqSetHex)
    })

    func.forEach((element) => {
      const funcHex = parseInt(element, 10)
      arrCsvContentHex.push(funcHex)
    })

    unitId.forEach((element) => {
      const unitIdHex = parseInt(element, 10)
      arrCsvContentHex.push(unitIdHex)
    })

    reserved.forEach((element) => {
      const reservedHex = parseInt(element, 10)
      arrCsvContentHex.push(reservedHex)
    })

    const addressHex = parseInt(address, 10)
    arrCsvContentHex.push(addressHex)
    const addressHexLength = addressHex.toString(16).length
    if (addressHexLength < 4) {
      for (let i = 0; i < 4 - addressHexLength; i++) {
        arrCsvContentHex.push(parseInt(0, 10))
      }
    }

    endian.forEach((element) => {
      const endianHex = element.charCodeAt()
      arrCsvContentHex.push(endianHex)
    })

    wordcnt.forEach((element) => {
      const wordcntHex = parseInt(element, 10)
      arrCsvContentHex.push(wordcntHex)
    })

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

    // // TODO : 실숫값 변환. 마찬가지로 바이너리로 떨어뜨리기
    // scale.forEach((element) => {
    //   const scaleHex = String.fromCharCode(element)
    //   arrCsvContentHex.push(scaleHex)
    // })
    // const scaleHex = scale

    useFlag.forEach((element) => {
      const useFlagHex = parseInt(element, 10)
      arrCsvContentHex.push(useFlagHex)
    })

    port.forEach((element) => {
      const portHex = parseInt(element, 10)
      arrCsvContentHex.push(portHex)
    })

    // TODO : 모두 다 끝나고 찍히는 0 제거하기
    // arrCsvContentHex.splice(40, 37)
  })
  console.log(arrCsvContentHex)
  finish.split('').forEach((element) => {
    arrCsvContentHex.push(element.charCodeAt())
  })
  finishFixValue.forEach((element) =>
    arrCsvContentHex.push(parseInt(element, 10)),
  )
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
      var ab = new ArrayBuffer(textArea.length) //textArea is the array with the integer
      var ia = new Uint8Array(ab)

      for (var i = 0; i < textArea.length; i++) {
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

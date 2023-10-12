import { useState } from 'react'

export default function useFile() {
  const [isActive, setActive] = useState(false)
  const [uploadedInfo, setUploadedInfo] = useState(null)
  const [isFile, setIsFile] = useState(true)
  const [isChanged, setIsChanged] = useState(true)

  const handleDragStart = () => setActive(true)
  const handleDragEnd = () => setActive(false)
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb'
    setUploadedInfo({ name, size, type }) // name, size, type 정보를 uploadedInfo에 저장
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
    setTimeout(() => {
      setIsChanged(false)
    }, 3000)
  }

  const handleFileDownload = () => {
    console.log('FileDownBtn Clicked')
  }

  return {
    isActive,
    uploadedInfo,
    isFile,
    isChanged,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleUpload,
    handleFileChange,
    handleFileDownload,
  }
}

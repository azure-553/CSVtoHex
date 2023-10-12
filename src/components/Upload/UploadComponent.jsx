import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../../assets/images/dropbox.svg'
import { Body, Title } from '../../styles/font'
import { FileInfo } from './FileInfo'
import FileBtn from '../FileBtn'

const UploadComponent = () => {
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

  return (
    <div>
      <UploadBoxStyled
        onDragEnter={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
        isActive={isActive}
      >
        <FileInput type="file" onChange={handleUpload} />
        {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
        {!uploadedInfo && (
          <>
            <Logo />
            <Title>클릭 혹은 파일을 이곳에 드롭하세요.</Title>
            <Body>파일당 최대 3MB</Body>
          </>
        )}
      </UploadBoxStyled>
      <BtnWrap>
        <FileBtn
          text="Hex 파일 변환"
          type="button"
          onClick={() => {
            console.log('FileChangeBtn Clicked');
            setIsFile(true)
            setTimeout(()=>{
              setIsChanged(false)
            },3000);
          }}
          disabled={isFile}
        />
        <FileBtn
          text="파일 다운로드"
          type="button"
          onClick={() => {
            console.log('FileDownBtn Clicked')
          }}
          disabled={isChanged}
        />
      </BtnWrap>
    </div>
  )
}

const UploadBoxStyled = styled.label`
  margin-bottom: 45px;
  padding-bottom: 100px;

  width: 1298px;
  height: 502px;

  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;

  border: 3px dashed ${props => props.isActive===true ? 'rgba(73, 80, 87, 0.80)': 'rgba(173, 181, 189, 0.40)'};

  &:hover {
    border: 3px dashed ${({ theme }) => theme.colors.gs500};
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const FileInput = styled.input`
  display: none;
  &::file-selector-button {
    font-size: 14px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    padding: 4px 32px;
    cursor: pointer;
  }
`

const BtnWrap = styled.div`
  margin: 0 auto;
  width: 420px;
  display: flex;
  justify-content: space-between;
`

export default UploadComponent

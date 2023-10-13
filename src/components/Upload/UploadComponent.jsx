import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../../assets/images/dropbox.svg'
import { Body, Title } from '../../styles/font'
import { FileInfo } from './FileInfo'
import useFile from '../../hooks/useFile'
import FileBtn from '../FileBtn'
import { Loading } from '../Loading'

const UploadComponent = () => {
  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    isActive,
    handleUpload,
    uploadedInfo,
    handleFileChange,
    isFile,
    handleFileDownload,
    isChanged,
    isLoading
  } = useFile()

  return (
    <div>
      <UploadBoxStyled
        onDragEnter={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
        isActive={isActive}
      >
        <FileInput type="file" onChange={handleUpload} accept=".csv"/>
        {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
        {isLoading && <Loading />}
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
          onClick={handleFileChange}
          disabled={isFile}
        />
        <FileBtn
          text="파일 다운로드"
          type="button"
          onClick={handleFileDownload}
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

  border: 3px dashed
    ${(props) =>
      props.isActive === true
        ? 'rgba(73, 80, 87, 0.80)'
        : 'rgba(173, 181, 189, 0.40)'};

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

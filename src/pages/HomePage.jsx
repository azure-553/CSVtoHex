import React, { useState } from 'react'
import FileBtn from '../components/FileBtn'
import styled from 'styled-components'
import UploadComponent from '../components/Upload/UploadComponent'

const HomePage = () => {
  const [isFile, setIsFile] = useState(false)
  const [isChanged, setIsChanged] = useState(true)

  return (
    <div>
      <UploadComponent/>
      <BtnWrap>
        <FileBtn
          text="Hex 파일 변환"
          type="button"
          onClick={() => {
            console.log('FileChangeBtn Clicked')
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

const BtnWrap = styled.div`
  margin: 0 auto;
  width: 420px;
  display: flex;
  justify-content: space-between;
`
export default HomePage

import React from 'react'
import styled from 'styled-components'
import { Title } from '../../styles/font'
import csvToJSON from '../../utils/csvToJson'

export const FileInfo = ({ uploadedInfo }) => {

  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)

  return (
    <InfoBox>
        {csvContent.map((item) => (
          <>
            <Title size="2.5rem">
              {item.id} |
              {item.HEAT_METER} |
              {item.c1} |
              {item.c2} |
              {item.c3} |
              {item.c4} |
              {item.c5} |
              {item.c6} |
              {item.a1} |
              {item.c7} |
              {item.a2} |
              {item.c8} |
              {item.c9} |
              {item.c10} |
              <br />
            </Title>
          </>
        ))}
    </InfoBox>
  )
}

const InfoBox = styled.ul`
  position: relative;
  display: block;
  list-style: none;
  padding-top: 40px;
`

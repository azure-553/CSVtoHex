import React from 'react'
import styled from 'styled-components'
import { CustomFont } from '../../styles/font'

export const FileInfo = ({ uploadedInfo }) => (
  <InfoBox>
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <InfoList key={key}>
        <CustomFont size="3.5rem">{key}</CustomFont>
        <br />
        <br />
        <CustomFont size="3.5rem">{value}</CustomFont>
      </InfoList>
    ))}
  </InfoBox>
)

const InfoBox = styled.ul`
  display: block;
  list-style: none;
  padding-top: 40px;
`

const InfoList = styled.li`
  display: block;

  margin-bottom: 30px;
`

import React from 'react'
import styled from 'styled-components'
import { CustomFont } from '../../styles/font'

export const FileInfo = ({ uploadedInfo }) => (
  <InfoBox>
    <CustomFont size="1.2rem">{uploadedInfo}</CustomFont>
  </InfoBox>
)

const InfoBox = styled.ul`
  position: relative;
  display: block;
  list-style: none;
  padding-top: 40px;
`

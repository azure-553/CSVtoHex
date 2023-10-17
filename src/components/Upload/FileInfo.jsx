import React from 'react'
import styled from 'styled-components'
import { Title } from '../../styles/font'

export const FileInfo = ({ uploadedInfo }) => (
  <InfoBox>
    <Title>{uploadedInfo}</Title>
  </InfoBox>
)

const InfoBox = styled.ul`
  position: relative;
  display: block;
  list-style: none;
  padding-top: 40px;
`

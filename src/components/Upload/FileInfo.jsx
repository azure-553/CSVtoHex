import React from 'react'
import styled from 'styled-components'
import { Title } from '../../styles/font'
import csvToJSON from '../../utils/csvToJson'

export const FileInfo = ({ uploadedInfo }) => {
  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)
  const formats = {
    formatI: 'INT64',
    formatJ: 'INT32',
    formatK: 'INT64',
    formatU: 'UNIT16',
    formatV: 'UNIT32',
    formatW: 'UNIT64',
    formatF: 'F32',
    formatD: 'F64',
    formatB: 'BITS',
  }
  csvContent.map((item) => {
    const seq = item.seq
    const deviceId = (item.device_id || '').split('')
    const tagCode = item.tag_code
    const reqSet = item.req_set
    const func = item.func
    const unitId = item.unit_id
    const reserved = item.Reserved
    const address = item.address
    const endian = (item.endian || '').split('')
    const wordcnt = item.wordcnt
    const format = item.format
    const scale = item.scale
    const useFlag = item.Use_flag
    const port = item.Port

    let arrCsvContentHex = []

    const seqHex = Number(seq).toString(16)
    arrCsvContentHex.push(seqHex)

    deviceId.forEach((element) => {
      const deviceIdHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(deviceIdHex)
    })

    const tagCodeHex = Number(tagCode).toString(16)
    arrCsvContentHex.push(tagCodeHex)

    const reqSetHex = Number(reqSet).toString(16)
    arrCsvContentHex.push(reqSetHex)

    const funcHex = Number(func).toString(16)
    arrCsvContentHex.push(funcHex)

    const unitIdHex = Number(unitId).toString(16)
    arrCsvContentHex.push(unitIdHex)

    const reservedHex = Number(reserved).toString(16)
    arrCsvContentHex.push(reservedHex)

    const addressHex = Number(address).toString(16)
    arrCsvContentHex.push(addressHex)

    endian.forEach((element) => {
      const endianHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(endianHex)
    })

    const wordcntHex = Number(wordcnt).toString(16)
    arrCsvContentHex.push(wordcntHex)

    if (format === formats.formatJ) {
      const formatHex = 'J'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatI) {
      const formatHex = 'I'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatK) {
      const formatHex = 'K'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatU) {
      const formatHex = 'U'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatV) {
      const formatHex = 'V'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatW) {
      const formatHex = 'W'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatF) {
      const formatHex = 'F'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatD) {
      const formatHex = 'D'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }
    if (format === formats.formatB) {
      const formatHex = 'B'.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    }

    const scaleHex = Number(scale).toString(16)
    arrCsvContentHex.push(scaleHex)

    const useFlagHex = Number(useFlag).toString(16)
    arrCsvContentHex.push(useFlagHex)

    const portHex = Number(port).toString(16)
    arrCsvContentHex.push(portHex)

    console.log(arrCsvContentHex)
  })

  return (
    <InfoBox>
      {csvContent.map((item) => (
        <>
          <Title size="2.5rem">
            {item.seq} {item.device_id} {item.tag_code} {item.req_set}{' '}
            {item.func} {item.unit_id} {item.Reserved} {item.address}{' '}
            {item.endian} {item.wordcnt} {item.format} {item.scale}{' '}
            {item.Use_flag} {item.Port} <br />
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

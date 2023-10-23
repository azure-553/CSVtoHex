import React from 'react'
import styled from 'styled-components'
import { Title } from '../../styles/font'
import csvToJSON from '../../utils/csvToJson'

export const FileInfo = ({ uploadedInfo }) => {
  const stringUploadInfo = String(uploadedInfo)
  let csvContent = csvToJSON(stringUploadInfo)
  csvContent.map((item) => {
    const seq = (item.seq || '').split('')
    const deviceId = (item.device_id || '').split('')
    const tagCode = (item.tag_code || '').split('')
    const reqSet = (item.req_set || '').split('')
    const func = (item.func || '').split('')
    const unitId = (item.unit_id || '').split('')
    const reserved = (item.Reserved || '').split('')
    const address = (item.address || '').split('')
    const endian = (item.endian || '').split('')
    const wordcnt = (item.wordcnt || '').split('')
    const format = (item.format || '').split('')
    const scale = (item.scale || '').split('')
    const useFlag = (item.Use_flag || '').split('')
    const port = (item.Port || '').split('')

    let arrCsvContentHex = []
    seq.forEach((element) => {
      const seqHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(seqHex)
    })
    deviceId.forEach((element) => {
      const deviceIdHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(deviceIdHex)
    })
    tagCode.forEach((element) => {
      const tagCodeHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(tagCodeHex)
    })
    reqSet.forEach((element) => {
      const reqSetHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(reqSetHex)
    })
    func.forEach((element) => {
      const funcHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(funcHex)
    })
    unitId.forEach((element) => {
      const unitIdHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(unitIdHex)
    })
    reserved.forEach((element) => {
      const reservedHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(reservedHex)
    })
    address.forEach((element) => {
      const addressHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(addressHex)
    })
    endian.forEach((element) => {
      const endianHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(endianHex)
    })
    wordcnt.forEach((element) => {
      const wordcntHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(wordcntHex)
    })
    format.forEach((element) => {
      const formatHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(formatHex)
    })
    scale.forEach((element) => {
      const scaleHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(scaleHex)
    })
    useFlag.forEach((element) => {
      const useFlagHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(useFlagHex)
    })
    port.forEach((element) => {
      const portHex = element.charCodeAt().toString(16)
      arrCsvContentHex.push(portHex)
    })

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

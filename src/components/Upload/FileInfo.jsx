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

    seq.forEach((element) => {
      const seqHex = element.charCodeAt()
      console.log(seqHex)
    })
    deviceId.forEach((element) => {
      const deviceIdHex = element.charCodeAt()
      console.log(deviceIdHex)
    })
    tagCode.forEach((element) => {
      const tagCodeHex = element.charCodeAt()
      console.log(tagCodeHex)
    })
    reqSet.forEach((element) => {
      const reqSetHex = element.charCodeAt()
      console.log(reqSetHex)
    })
    func.forEach((element) => {
      const funcHex = element.charCodeAt()
      console.log(funcHex)
    })
    unitId.forEach((element) => {
      const unitIdHex = element.charCodeAt()
      console.log(unitIdHex)
    })
    reserved.forEach((element) => {
      const reservedHex = element.charCodeAt()
      console.log(reservedHex)
    })
    address.forEach((element) => {
      const addressHex = element.charCodeAt()
      console.log(addressHex)
    })
    endian.forEach((element) => {
      const endianHex = element.charCodeAt()
      console.log(endianHex)
    })
    wordcnt.forEach((element) => {
      const wordcntHex = element.charCodeAt()
      console.log(wordcntHex)
    })
    format.forEach((element) => {
      const formatHex = element.charCodeAt()
      console.log(formatHex)
    })
    scale.forEach((element) => {
      const scaleHex = element.charCodeAt()
      console.log(scaleHex)
    })
    useFlag.forEach((element) => {
      const useFlagHex = element.charCodeAt()
      console.log(useFlagHex)
    })
    port.forEach((element) => {
      const portHex = element.charCodeAt()
      console.log(portHex)
    })
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

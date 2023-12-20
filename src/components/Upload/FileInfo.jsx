import React from 'react';
import styled from 'styled-components';
import { Title } from 'styles/font';
import csvToJSON from 'utils/csvToJson';

export const FileInfo = ({ uploadedInfo }) => {
  const stringUploadInfo = String(uploadedInfo);
  let csvContent = csvToJSON(stringUploadInfo);

  return (
    <InfoBox>
      {csvContent.map((item) => (
        <React.Fragment key={item.seq}>
          <Title size="2.5rem">
            {item.seq} {item.device_id} {item.tag_code} {item.req_set}{' '}
            {item.func} {item.unit_id} {item.Reserved} {item.address}{' '}
            {item.endian} {item.wordcnt} {item.format} {item.scale}{' '}
            {item.Use_flag} {item.Port} <br />
          </Title>
        </React.Fragment>
      ))}
    </InfoBox>
  );
};

const InfoBox = styled.ul`
  width: 800px;
  position: relative;
  display: block;
  list-style: none;
  padding-top: 40px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

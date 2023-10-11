import React from 'react';
import { styled } from 'styled-components';
import { ButtonText } from '../styles/font';

const FileChangeBtn = ({ text, type, onClick }) => {
  return (
    <Box type={type} onClick={onClick} disabled>
        <ButtonText>{text}</ButtonText>
    </Box>
  );
};

const Box = styled.button`
  display: flex;
  width: 200px;
  height: 49px;
  padding: 17px 34px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: none;
  border-color: ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray200};

  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.p700};
    color: ${({ theme }) => theme.colors.white};
  }
`;
export default FileChangeBtn;
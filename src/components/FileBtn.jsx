import React from 'react';
import { styled } from 'styled-components';
import { ButtonText } from 'styles/font';

const FileChangeBtn = ({ text, type, onClick, disabled }) => {
  return (
    <Box type={type} onClick={onClick} disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </Box>
  );
};

const Box = styled.button`
  cursor: pointer;
  display: flex;
  width: 200px;
  height: 49px;
  padding: 17px 34px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: none;
  border-color: ${({ theme }) => theme.colors.p700};
  background-color: ${({ theme }) => theme.colors.p700};
  color: ${({ theme }) => theme.colors.white};

  &:disabled {
    cursor: default;
    border-color: ${({ theme }) => theme.colors.gs300};
    background-color: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gs500};
  }
`;
export default FileChangeBtn;

import React from 'react';
import LoadingSpinner from 'assets/gif/Loading.gif';
import styled from 'styled-components';

export const Loading = () => {
  return (
    <LoadingWrap>
      <img src={LoadingSpinner} alt="Loading..." width="50%" />
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  position: absolute;
  padding: 50px 0 0 100px;
`;

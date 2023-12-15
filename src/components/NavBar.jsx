import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
  return <NavWrap />;
};

const NavWrap = styled.nav`
  width: 100%;
  height: 70px;

  background-color: ${({ theme }) => theme.colors.p500};
  border-bottom: 1px solid ${({ theme }) => theme.colors.yellow};
`;

export default NavBar;

import React from 'react';
import { styled } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import NavBar from 'components/NavBar';

const MainRouter = () => {
  return (
    <section>
      <NavBar />
      <Container>
        {/*헤더*/}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </section>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  justify-content: center;
  margin: auto;
  padding-top: 45px;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.p500};
`;

export default MainRouter;

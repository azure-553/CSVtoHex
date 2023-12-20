import React from 'react';
import GlobalStyle from 'styles/GlobalStyle';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from 'MainRouter';

const App = () => {
  return (
    <main>
      <GlobalStyle />
      <Router>
        <MainRouter />
      </Router>
    </main>
  );
};

export default App;

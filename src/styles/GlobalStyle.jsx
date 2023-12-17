import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: normal;

    src: url('../assets/fonts/SpoqaHanSansNeo-Bold.ttf') format('SpoqaHanSansNeoB'),
        url('../assets/fonts/SpoqaHanSansNeo-Light.ttf') format('SpoqaHanSansNeoL'),
        url('../assets/fonts/SpoqaHanSansNeo-Medium.ttf') format('SpoqaHanSansNeoM'),
        url('../assets/fonts/SpoqaHanSansNeo-Regular.ttf') format('SpoqaHanSansNeoR'),
        url('../assets/fonts/SpoqaHanSansNeo-Thin.ttf') format('SpoqaHanSansNeoT'),
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    font-size: 10px;
  }
  body {
    font-family: 'SpoqaHanSansNeo', sans-serif;
  }
`;
export default GlobalStyle;

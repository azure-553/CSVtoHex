import React from "react";
import { Body, ButtonText, CustomFont, Title } from "./styles/font";

const App = () => {
  return (
    <main>
      <Title>Hello world</Title>
      <br/>
      <Body>Hi</Body>
      <br/>
      <CustomFont>This is CustomFont</CustomFont>
      <br/>
      <ButtonText>This is ButtonText</ButtonText>
    </main>
  );
}

export default App;

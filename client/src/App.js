import React, { useState } from 'react';
import styled from 'styled-components';
import Form from './components/Form/Form.js';
const App = () => {
  // state for the start test button
  const [start, setStart] = useState(false);
  return (
    <Container>
      <Title>Do You Know English?</Title>
      {start ? (
        <Form />
      ) : (
        <Play onClick={() => setStart(true)}>Start Test</Play>
      )}
    </Container>
  );
};

const Container = styled.div`
  background: #171717;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 240px) {
    justify-content: center;
  }
  @media (min-width: 1240px) {
    justify-content: flex-start;
  }
`;
const Title = styled.div`
  font-weight: 800;
  line-height: 53px;
  color: white;
  margin-top: 1%;
  @media (min-width: 240px) {
    font-size: 32px;
  }
  @media (min-width: 1240px) {
    font-size: 48px;
  }
`;
const Play = styled.button`
  width: fit-content;
  height: fit-content;

  background: linear-gradient(90deg, #016299 0%, #f77599 92.59%);
  border-radius: 15px;
  border-color: transparent;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  line-height: 13px;
  margin-top: 20%;
  color: #ffffff;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12),
      0 8px 32px -8px hsla(0, 0%, 0%, 0.14),
      0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
  }
  @media (min-width: 240px) {
    padding: 5%;
  }
  @media (min-width: 1240px) {
    padding: 2%;
  }
`;
export default App;

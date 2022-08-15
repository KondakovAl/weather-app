import React from 'react';
import styled from 'styled-components';
import { Card } from './components/Card';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherApp = styled.div`
  width: 390px;
  height: fit-content;
`;

const App = () => {
  return (
    <AppWrapper>
      <WeatherApp>
        <Card />
      </WeatherApp>
    </AppWrapper>
  );
};

export default App;

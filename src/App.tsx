import React from 'react';
import styled from 'styled-components';
import { MainCard } from './components/MainCard';
import { HourlyCard } from './components/HourlyCard';
import { WeeklyCard } from './components/WeeklyCard';
import { Location } from './components/Location';
import { bgColors } from './styles/variables';
import { getLocation } from './api/getLocation';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const WeatherApp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  width: 390px;
  background-color: ${bgColors.bgLightColor};
  overflow-x: hidden;
  height: 800px;
`;

const App = () => {
  return (
    <AppWrapper>
      <WeatherApp>
        <MainCard />
        <HourlyCard />
        <WeeklyCard />
      </WeatherApp>
      <WeatherApp>
        <Location />
      </WeatherApp>
    </AppWrapper>
  );
};

export default App;

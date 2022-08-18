import styled from 'styled-components';
import { HourlyCard } from '../components/HourlyCard';
import { MainCard } from '../components/MainCard';
import { WeeklyCard } from '../components/WeeklyCard';
import { bgColors } from '../styles/variables';

const WeatherApp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  background-color: ${bgColors.bgLightColor};
  width: 100%;
  height: 100%;
`;

const MainPage = () => {
  return (
    <WeatherApp>
      <MainCard />
      <HourlyCard />
      <WeeklyCard />
    </WeatherApp>
  );
};

export { MainPage };

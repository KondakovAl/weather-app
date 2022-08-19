import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getCurrentWeather, getDailyWeather } from '../api/getWeatherData';
import { HourlyCard } from '../components/HourlyCard';
import { MainCard } from '../components/MainCard';
import { WeeklyCard } from '../components/WeeklyCard';
import { bgColors } from '../styles/variables';
import { Loader } from '../styles/Loader';

const WeatherApp = styled.div`
  display: flex;

  flex-direction: column;
  padding: 15px 0;
  background-color: ${bgColors.bgLightColor};
  width: 100%;
  height: 100%;
`;

interface MainPageProps {
  currentLocation: any;
}

const MainPage = ({ currentLocation }: MainPageProps) => {
  const [currentWeather, setCurrentWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentLocation) {
      const [lat, lon] = currentLocation.value.split(' ');
      setLoading(true);
      getCurrentWeather(lat, lon).then((res) => {
        setCurrentWeather({ city: currentLocation.label, ...res });
        setLoading(false);
      });
    }

    console.log(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    console.log(currentWeather);
  }, [currentWeather]);

  return (
    <WeatherApp>
      <MainCard dataCurrent={currentWeather} loading={loading} />
      <HourlyCard />
      <WeeklyCard />
    </WeatherApp>
  );
};

export { MainPage };

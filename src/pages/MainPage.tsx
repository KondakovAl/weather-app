import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getCurrentWeather, getDailyWeather } from '../api/getWeatherData';
import { HourlyCard } from '../components/HourlyCard';
import { MainCard } from '../components/MainCard';
import { DailyCard } from '../components/DailyCard';
import { bgColors } from '../styles/variables';

const WeatherApp = styled.div`
  display: flex;

  flex-direction: column;
  padding: 15px 0;
  background-color: ${bgColors.bgLightColor};
  width: 100%;
  height: 100%;
`;

interface MainPageProps {
  currentLocation: {
    value: string;
    label: string;
  };
}

const MainPage = ({ currentLocation }: MainPageProps) => {
  const [currentWeather, setCurrentWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [loadingCurrent, setLoadingCurrrent] = useState<boolean>(true);
  const [loadingDaily, setLoadingDaily] = useState<boolean>(true);

  useEffect(() => {
    if (currentLocation) {
      const [lat, lon] = currentLocation.value.split(' ');
      getCurrentWeather(lat, lon).then((res) => {
        setCurrentWeather({ city: currentLocation.label, ...res });
        setLoadingCurrrent(false);
      });
      getDailyWeather(lat, lon).then((res) => {
        setDailyWeather(res);
        setLoadingDaily(false);
      });
    }
    console.log(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    console.log(currentWeather);
  }, [currentWeather]);

  useEffect(() => {
    console.log(dailyWeather);
  }, [dailyWeather]);

  return (
    <WeatherApp>
      <MainCard dataCurrent={currentWeather} loading={loadingCurrent} />
      <HourlyCard />
      <DailyCard dataDaily={dailyWeather} loading={loadingDaily} />
    </WeatherApp>
  );
};

export { MainPage };

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getCurrentWeather, getDailyWeather } from '../api/getWeatherData';
import { HourlyCard } from '../components/HourlyCard';
import { MainCard } from '../components/MainCard';
import { DailyCard } from '../components/DailyCard';
import { bgColors } from '../styles/variables';
import { getDate } from '../helpers/getFormatedDate';

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
  date: any;
  setDate: (date: any) => void;
  currentWeather: any;
  setCurrentWeather: (currentWeather: any) => void;
  otherWeather: any;
  setOtherWeather: (otherWeather: any) => void;
  favLocations: any;
  setFavLocations: (favLocations: any) => void;
}

const MainPage = ({
  currentLocation,
  date,
  setDate,
  currentWeather,
  setCurrentWeather,
  otherWeather,
  setOtherWeather,
  favLocations,
  setFavLocations,
}: MainPageProps) => {
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
        setOtherWeather(res);
        setLoadingDaily(false);
      });
    }
  }, [currentLocation]);

  useEffect(() => {
    console.log(currentWeather);
  }, [currentWeather]);

  useEffect(() => {
    console.log(otherWeather);
  }, [otherWeather]);

  useEffect(() => {
    if (currentWeather && currentWeather.timezone) {
      setDate(getDate(currentWeather.timezone));
    }
  }, [currentWeather]);

  return (
    <WeatherApp>
      <MainCard
        dataCurrent={currentWeather}
        loading={loadingCurrent}
        date={date}
        favLocations={favLocations}
        setFavLocations={setFavLocations}
        currentLocation={currentLocation}
      />
      <HourlyCard
        dataHourly={otherWeather}
        loading={loadingDaily}
        date={date}
      />
      <DailyCard dataDaily={otherWeather} loading={loadingDaily} />
    </WeatherApp>
  );
};

export { MainPage };

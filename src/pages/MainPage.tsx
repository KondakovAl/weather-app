import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getCurrentWeather, getDailyWeather } from '../api/getWeatherData';
import { HourlyCard } from '../components/HourlyCard';
import { MainCard } from '../components/MainCard';
import { DailyCard } from '../components/DailyCard';
import { bgColors } from '../styles/variables';
import { getDate } from '../helpers/getFormatedDate';
import { SkeletonLoader } from '../styles/Loader';

const WeatherApp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  background-color: ${bgColors.bgLightColor};
  width: 100%;
  height: 100%;
`;

const LoaderCurrent = styled(SkeletonLoader)`
  width: calc(100% - 40px);
  height: 353px;
  border-radius: 30px;
  margin: 0 auto 16px;
`;

const LoaderHourly = styled(SkeletonLoader)`
  width: 100%;
  height: 157px;
  margin-bottom: 16px;
  animation-delay: 0.4s;
`;

const LoaderDaily = styled(SkeletonLoader)`
  width: 100%;
  height: 375px;
  animation-delay: 0.8s;
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
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

  useEffect(() => {
    if (currentLocation) {
      const [lat, lon] = currentLocation.value.split(' ');
      Promise.all([
        getCurrentWeather(lat, lon),
        getDailyWeather(lat, lon),
      ]).then((res) => {
        setCurrentWeather(res[0]);
        setOtherWeather(res[1]);
        setLoadingWeather(false);
      });
    }
  }, [currentLocation]);

  useEffect(() => {
    console.log(`weather`, currentWeather);
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
      {loadingWeather ? (
        <>
          <LoaderCurrent />
          <LoaderHourly />
          <LoaderDaily />
        </>
      ) : (
        <>
          <MainCard
            dataCurrent={currentWeather}
            date={date}
            favLocations={favLocations}
            setFavLocations={setFavLocations}
            currentLocation={currentLocation}
          />
          <HourlyCard dataHourly={otherWeather} date={date} />
          <DailyCard dataDaily={otherWeather} />
        </>
      )}
    </WeatherApp>
  );
};

export { MainPage };

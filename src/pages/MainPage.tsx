/*Import React*/
import styled from 'styled-components';
import { useState, useEffect } from 'react';

/*Import Helpers*/
import { getCurrentWeather, getDailyWeather } from '../api/getWeatherData';
import { getDate } from '../helpers/getFormatedDate';

/*Import Components*/
import { HourlyCard } from '../components/HourlyCard';
import { MainCard } from '../components/MainCard';
import { DailyCard } from '../components/DailyCard';

/*Import Styles*/
import { bgColors } from '../styles/variables';

/*Import Styles*/
import { SkeletonLoader } from '../styles/Loader';

/*Import Types*/
import {
  CurrentLocationProps,
  DateProps,
  CardMainProps,
  CardOtherProps,
} from '../types/types';
import { NotFoundPage } from './NotFoundPage';

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
  currentLocation: CurrentLocationProps;
  date: DateProps;
  setDate: React.Dispatch<React.SetStateAction<DateProps | null>>;
  currentWeather: CardMainProps;
  setCurrentWeather: React.Dispatch<React.SetStateAction<CardMainProps | null>>;
  otherWeather: CardOtherProps;
  setOtherWeather: React.Dispatch<React.SetStateAction<CardOtherProps | null>>;
  favLocations: string[];
  setFavLocations: React.Dispatch<React.SetStateAction<string[]>>;
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
  }, [currentLocation, setCurrentWeather, setOtherWeather]);

  useEffect(() => {
    if (currentWeather && currentWeather.timezone) {
      setDate(getDate(currentWeather.timezone));
    }
  }, [currentWeather, setDate]);

  if (!currentLocation) {
    return <NotFoundPage />;
  }

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

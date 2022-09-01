import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useEffect, useState } from 'react';
import { getTheme } from './helpers/getTheme';
import {
  afternoonTheme,
  bgColors,
  eveningTheme,
  idleTheme,
  morningTheme,
  nightTheme,
} from './styles/variables';
import { Context } from './context/context';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${bgColors.bgGreyColor};
`;

const WeatherApp = styled.div`
  width: 450px;
  overflow-x: hidden;
  height: 100%;
`;

const App = () => {
  const [currentLocation, setCurrentLocation] = useState<string | any>();
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [otherWeather, setOtherWeather] = useState();
  const [favLocations, setFavLocations] = useState<any[]>([]);
  const [coords, setCoords] = useState<any>();
  const [date, setDate] = useState<any>();
  const [theme, setTheme] = useState<string | undefined>('idle');

  /*Geolocation*/
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setFavLocations([`${lat} ${lon}`]);
      setCoords({ lon: lon.toFixed(1), lat: lat.toFixed(1) });
    });
  }, []);

  /*Theme*/
  const switchTheme = () => {
    if (getTheme(date?.hour) === 'morning') {
      setTheme('morning');
    }
    if (getTheme(date?.hour) === 'afternoon') {
      setTheme('afternoon');
    }
    if (getTheme(date?.hour) === 'evening') {
      setTheme('evening');
    }
    if (getTheme(date?.hour) === 'night') {
      setTheme('night');
    }
  };

  useEffect(() => {
    setTheme('idle');
    switchTheme();
  }, [date]);

  return (
    <ThemeProvider
      theme={
        theme === 'idle'
          ? idleTheme
          : theme === 'morning'
          ? morningTheme
          : theme === 'afternoon'
          ? afternoonTheme
          : theme === 'evening'
          ? eveningTheme
          : theme === 'night'
          ? nightTheme
          : null
      }
    >
      <AppWrapper>
        <WeatherApp>
          <Routes>
            <Route
              path='/'
              element={
                <SearchPage
                  currentLocation={currentLocation}
                  setCurrentLocation={setCurrentLocation}
                  currentWeather={currentWeather}
                  setOtherWeather={setOtherWeather}
                  setCurrentWeather={setCurrentWeather}
                  favLocations={favLocations}
                  setFavLocations={setFavLocations}
                  coords={coords}
                />
              }
            />
            <Route
              path='/card'
              element={
                <MainPage
                  currentLocation={currentLocation}
                  date={date}
                  setDate={setDate}
                  currentWeather={currentWeather}
                  setCurrentWeather={setCurrentWeather}
                  otherWeather={otherWeather}
                  setOtherWeather={setOtherWeather}
                  favLocations={favLocations}
                  setFavLocations={setFavLocations}
                />
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </WeatherApp>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;

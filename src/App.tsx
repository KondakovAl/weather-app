/*Import React*/
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

/*Import Pages*/
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';

/*Import Helpers*/
import { getTheme } from './helpers/getTheme';

/*Import Styles*/
import {
  afternoonTheme,
  eveningTheme,
  gradients,
  idleTheme,
  morningTheme,
  nightTheme,
} from './styles/variables';

/*Import Types*/
import {
  CoordsProps,
  DateProps,
  CurrentLocationProps,
  CardOtherProps,
  ThemeProps,
  CardMainProps,
} from './types/types';

const backgroundAnimation = keyframes`
0% {
  background-position: 0 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0 50%;
}
`;

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${gradients.other};
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;
  @media (max-width: 450px) {
    background: ${gradients.main};
    background-size: cover;
    animation: none;
  }
`;

const WeatherApp = styled.div`
  width: 450px;
  overflow-x: hidden;
  height: 100%;
`;

const App = () => {
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationProps | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CardMainProps | null>(
    null
  );
  const [otherWeather, setOtherWeather] = useState<CardOtherProps | null>(null);
  const [date, setDate] = useState<DateProps | null>(null);
  const [favLocations, setFavLocations] = useState<string[]>([]);
  const [coords, setCoords] = useState<CoordsProps>();
  const [theme, setTheme] = useState<ThemeProps>(idleTheme);

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
  useEffect(() => {
    const switchTheme = () => {
      let currentHour = getTheme(date?.hour!);
      switch (currentHour) {
        case 'morning':
          setTheme(morningTheme);
          break;
        case 'afternoon':
          setTheme(afternoonTheme);
          break;
        case 'evening':
          setTheme(eveningTheme);
          break;
        case 'night':
          setTheme(nightTheme);
          break;
        default:
          setTheme(idleTheme);
      }
    };
    switchTheme();
  }, [date, theme]);

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <WeatherApp>
          <Routes>
            <Route
              path='/'
              element={
                <SearchPage
                  currentLocation={currentLocation!}
                  setCurrentLocation={setCurrentLocation!}
                  favLocations={favLocations}
                  setFavLocations={setFavLocations}
                  coords={coords!}
                />
              }
            />
            <Route
              path='/card'
              element={
                <MainPage
                  currentLocation={currentLocation!}
                  date={date!}
                  setDate={setDate}
                  currentWeather={currentWeather!}
                  setCurrentWeather={setCurrentWeather}
                  otherWeather={otherWeather!}
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

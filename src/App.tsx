/*Import React*/
import styled, { ThemeProvider } from 'styled-components';
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
  bgColors,
  eveningTheme,
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
} from './types/types';

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
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationProps>();
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [otherWeather, setOtherWeather] = useState<CardOtherProps>();
  const [favLocations, setFavLocations] = useState<string[]>([]);
  const [coords, setCoords] = useState<CoordsProps>();
  const [date, setDate] = useState<DateProps>();
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
  const switchTheme = () => {
    switch (getTheme(date?.hour!)) {
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

  useEffect(() => {
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
                  setCurrentLocation={setCurrentLocation}
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
                  currentWeather={currentWeather}
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

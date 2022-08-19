import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useState } from 'react';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherApp = styled.div`
  width: 390px;
  overflow-x: hidden;
  height: 100%;
`;

const App = () => {
  const [currentLocation, setCurrentLocation] = useState<string | any>();

  return (
    <AppWrapper>
      <WeatherApp>
        <Routes>
          <Route
            path='/'
            element={<SearchPage setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path='/card'
            element={<MainPage currentLocation={currentLocation} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </WeatherApp>
    </AppWrapper>
  );
};

export default App;

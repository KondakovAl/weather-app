import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
  height: 800px;
`;

const App = () => {
  return (
    <AppWrapper>
      <WeatherApp>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/card' element={<MainPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </WeatherApp>
    </AppWrapper>
  );
};

export default App;

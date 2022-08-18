import styled from 'styled-components';
import { bgColors } from '../styles/variables';
import { Location } from '../components/Location';

const WeatherApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px 0;
  background-color: ${bgColors.bgLightColor};
`;

const SearchPage = () => {
  return (
    <WeatherApp>
      <Location />
    </WeatherApp>
  );
};

export { SearchPage };

import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Variables*/
import { bgColors, gradients, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';
import { ReactComponent as IconPlus } from '../assets/images/icon_plus.svg';

/*Import Components*/
import { LocationCards } from '../components/LocationCards';
import { Search } from '../components/Search';
import { useRef, useEffect, useState } from 'react';
import { getCurrentWeather } from '../api/getWeatherData';

const WeatherApp = styled.div`
  height: 100%;
  padding: 15px;
  background-color: ${bgColors.bgLightColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
  padding: 16px;
  background: ${gradients.main};
  border-radius: 30px;
  overflow: auto;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
  min-height: 32px;
`;

const CardTitle = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0 auto;
`;

interface StyledIconWrapperProps {
  currentLocation: any;
}

const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
  display: ${(p) => (p.currentLocation ? 'flex' : 'none')};
  cursor: pointer;
`;

const CardIconContainer = styled.div`
  cursor: pointer;
  align-self: center;
  background-color: ${colors.lightColor};
  border-radius: 50%;
  margin-top: 5px;
  padding: 5px;
  transition: all 1s ease;
  & svg {
    display: block;
    & path {
      transition: all 1s ease;
      stroke: ${colors.cardsLocationColor};
    }
  }
  &:hover {
    background-color: ${colors.cardsLocationColor};
    & svg path {
      stroke: ${colors.lightColor};
    }
  }
`;

interface SearchPageProps {
  currentLocation: {
    value: string;
    label: string;
  };
  setCurrentLocation: (currentLocation: string) => void;
  currentWeather: any;
  setCurrentWeather: (currentWeather: any) => void;
  favLocations: any;
  setFavLocations: (favLocations: any) => void;
}

const SearchPage = ({
  currentLocation,
  setCurrentLocation,
  currentWeather,
  setCurrentWeather,
  favLocations,
  setFavLocations,
}: SearchPageProps) => {
  const [favWeather, setFavWeather] = useState<any>();

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const focusHandler = () => {
    inputRef.current.focus();
  };

  const getFavArr = () => {
    const favArr: any = [];
    favLocations.forEach((item: any) => {
      const [lat, lon] = item.split(' ');
      favArr.push(getCurrentWeather(lat, lon));
    });
    console.log(`array`, favArr);
    return favArr;
  };

  useEffect(() => {
    Promise.all(getFavArr()).then((res) => {
      setFavWeather(res);
    });
  }, [favLocations]);

  useEffect(() => {
    console.log(`location coords`, favLocations);
  }, [favLocations]);

  return (
    <WeatherApp>
      <Container>
        <CardHeader>
          <Link to='/card'>
            <StyledIconWrapper currentLocation={currentLocation}>
              <IconArrow />
            </StyledIconWrapper>
          </Link>
          <CardTitle>Manage Location</CardTitle>
        </CardHeader>
        <Search setCurrentLocation={setCurrentLocation} ref={inputRef} />

        <LocationCards favWeather={favWeather} />

        <CardIconContainer onClick={focusHandler}>
          <IconPlus />
        </CardIconContainer>
      </Container>
    </WeatherApp>
  );
};

export { SearchPage };

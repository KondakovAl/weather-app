import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Variables*/
import { bgColors, gradients, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';
import { ReactComponent as IconPlus } from '../assets/images/icon_plus.svg';

/*Import Components*/
import { LocationCard } from '../components/LocationCard';
import { Search } from '../components/Search';
import { useRef, useEffect, useState } from 'react';
import { getCurrentWeather, getDailyWeather } from '../api/getWeatherData';

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

const wave = keyframes`
  to {
    background-position: 120% 0;
  }
`;

const LoaderFav = styled.div<{ transitionDelay: number }>`
  display: block;
  width: 100%;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(
      to right,
      rgba(200, 200, 200, 0),
      rgba(200, 200, 200, 0.5) 50%,
      rgba(200, 200, 200, 0) 80%
    ),
    #ebebeb;
  background-size: 50px;
  background-repeat: repeat-y;
  background-position: -20% 0;
  margin-bottom: 10px;
  animation: ${wave} 3s ease infinite;
  animation-delay: ${(p) => p.transitionDelay + 's'};
`;

interface SearchPageProps {
  currentLocation: {
    value: string;
    label: string;
  };
  setCurrentLocation: (currentLocation: any) => void;
  currentWeather: any;
  setCurrentWeather: (currentWeather: any) => void;
  favLocations: any;
  setOtherWeather: (otherWeather: any) => void;
  setFavLocations: (favLocations: any) => void;
  coords: any;
}

const SearchPage = ({
  currentLocation,
  setCurrentLocation,
  setOtherWeather,
  favLocations,
  coords,
}: SearchPageProps) => {
  const [favWeather, setFavWeather] = useState<any>([]);
  const [favLoading, setFavLoading] = useState<boolean>();
  const [currentCard, setCurrentCard] = useState<null | any>(null);

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
    setFavLoading(true);
    Promise.all(getFavArr()).then((res) => {
      setFavWeather(res);
      setFavLoading(false);
    });
  }, [favLocations]);

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

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
        {favLoading
          ? favLocations &&
            favLocations.map((item: any, index: number) => (
              <LoaderFav key={index} transitionDelay={index * 0.3} />
            ))
          : favWeather.length > 0 &&
            favWeather.map((card: any, index: number) => (
              <Link
                to='/card'
                key={index}
                onClick={() => {
                  setCurrentLocation({ value: favLocations[index] });
                }}
              >
                <LocationCard card={card} coords={coords} />
              </Link>
            ))}

        <CardIconContainer onClick={focusHandler}>
          <IconPlus />
        </CardIconContainer>
      </Container>
    </WeatherApp>
  );
};

export { SearchPage };

// function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: any) {
//   console.log(`drag`, card);
//   setCurrentCard(card);
// }

// function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {}

// function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
//   e.preventDefault();
// }

// function dropHandler(e: React.DragEvent<HTMLDivElement>, card: any) {
//   e.preventDefault();
//   console.log(`drop`, card);
//   setFavWeather(favWeather.map((c: any) => {}));}

//
//   draggable={true}
//   onDragStart={(e) => dragStartHandler(e, card)}
//   onDragLeave={(e) => dragEndHandler(e)}
//   onDragEnd={(e) => dragEndHandler(e)}
//   onDragOver={(e) => dragOverHandler(e)}
//   onDrop={(e) => dropHandler(e, card)}
// >

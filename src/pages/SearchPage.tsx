import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

/*Import Variables*/
import { bgColors, gradients, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';
import { ReactComponent as IconPlus } from '../assets/images/icon_plus.svg';

import checkMark from '../assets/images/icon_checkmark.svg';

/*Import Components*/
import { LocationCard } from '../components/LocationCard';
import { Search } from '../components/Search';
import { useRef, useEffect, useState } from 'react';
import { getCurrentWeather } from '../api/getWeatherData';
import { SkeletonLoader } from '../styles/Loader';

const WeatherApp = styled.div`
  height: 100%;
  padding: 15px;
  background-color: ${bgColors.bgLightColor};
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
  padding: 16px;
  background: ${gradients.main};
  border-radius: 30px;
  overflow-y: auto;
  overflow-x: hidden;
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

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

interface StyledIconWrapperProps {
  currentLocation: any;
  favLocations: any;
}

const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
  display: ${(p) => (p.currentLocation && p.favLocations ? 'flex' : 'none')};
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

const LocationCardContainer = styled.div<{ isDraggable: boolean }>`
  position: relative;
  display: flex;
  align-self: center;
  width: calc(100% - 10px);
  margin: 0 auto;
  cursor: ${({ isDraggable }) => (isDraggable ? `grab` : 'default')};
`;

const LoaderFav = styled(SkeletonLoader)<{ transitionDelay: number }>`
  height: 80px;
  border-radius: 16px;
  margin-bottom: 10px;
  width: calc(100% - 10px);
  margin: 0 auto;
  animation-delay: ${(p) => p.transitionDelay + 's'};
`;

const CheckboxWrapper = styled.div<{
  state: string;
}>`
  position: absolute;
  bottom: 2%;
  right: 4%;
  transform: translateX(
    ${({ state }) => {
      switch (state) {
        case 'entering':
          return '0px';
        case 'entered':
          return '0px';
        case 'exiting':
          return '0px';
        case 'exited':
          return '400px';
      }
    }}
  );
  /* display: ${({ state }) => (state === 'exited' ? 'none' : 'flex')}; */
  transition: transform 1s ease, display 1s ease 2s;
  user-select: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  width: fit-content;
  position: relative;
  cursor: pointer;
  padding: 10px 15px;
  background: ${colors.lightColor};
  color: ${colors.cardsLocationColor};
  border: 1px solid ${colors.cardsLocationColor};
  border-radius: 10px;
`;

const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  visibility: hidden;
  display: none;
`;

const CheckboxMark = styled.span<{ isDraggable: boolean }>`
  display: flex;
  position: relative;
  border: 1px solid ${colors.cardsLocationColor};
  background-image: url(${checkMark});
  background-color: ${({ isDraggable }) =>
    isDraggable ? `${bgColors.bgGreyColor}` : 'transparent'};
  background-size: 12px 12px;
  width: 14px;
  height: 14px;
  left: 0;
  margin-right: 5px;
  transition: background-color 0.3s ease;
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
  favLocations,
  setFavLocations,
  coords,
}: SearchPageProps) => {
  const [favWeather, setFavWeather] = useState<any>([]);
  const [favLoading, setFavLoading] = useState<boolean>();
  const [currentCard, setCurrentCard] = useState<null | any>(null);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [isCheckboxAnimated, setIsCheckboxAnimated] = useState<boolean>(false);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const focusHandler = () => {
    inputRef.current.focus();
  };

  const getFavArray = () => {
    const favArray: any = [];
    favLocations.forEach((item: any) => {
      const [lat, lon] = item?.split(' ');
      favArray.push(getCurrentWeather(lat, lon));
    });
    return favArray;
  };

  useEffect(() => {
    setFavLoading(true);
    const favWeatherArray: any = [];
    Promise.all(getFavArray()).then((res) => {
      res.forEach((item, index) => {
        favWeatherArray.push({
          ...item,
          order: index,
          id: index,
        });
      });
      setFavWeather(favWeatherArray);
      setFavLoading(false);
    });
  }, [favLocations]);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: any) => {
    setCurrentCard(card);
    // const target = e.target as HTMLDivElement;
    // target.style.opacity = `1`;
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    // target.style.background = `white`;
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // const target = e.target as HTMLDivElement;
    // target.style.background = `lightgrey`;
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: any) => {
    e.preventDefault();

    let fav = [...favLocations];
    let swap = fav[card.id];

    const test = favWeather?.map((c: any) => {
      if (c.id === card.id) {
        console.log(`cardID`, card.id, currentCard.order);
        console.log(`1`, fav);
        fav[card.id] = fav[currentCard.order];
        console.log(`2`, fav);
        fav[currentCard.order] = swap;
        console.log(`3`, fav);
        return { ...c, order: currentCard.order };
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order };
      }
      return c;
    });
    setFavLocations(fav);
    setFavWeather(test);
  };

  const sortCards = (a: { order: number }, b: { order: number }) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  useEffect(() => {
    if (favLocations.length >= 0 && favLocations.length <= 1) {
      setIsCheckboxAnimated(false);
    }
    if (favLocations.length > 1) {
      setIsCheckboxAnimated(true);
    }

    console.log(`loc`, favLocations);
  }, [favLocations]);

  useEffect(() => {
    console.log(`weather`, favWeather);
  }, [favWeather]);

  return (
    <WeatherApp>
      <Container>
        <CardHeader>
          <Link to='/card'>
            <StyledIconWrapper
              currentLocation={currentLocation}
              favLocations={favLocations.length !== 0}
            >
              <IconArrow />
            </StyledIconWrapper>
          </Link>
          <CardTitle>Manage Location</CardTitle>
        </CardHeader>
        <Search setCurrentLocation={setCurrentLocation} ref={inputRef} />

        <Transition in={isCheckboxAnimated} timeout={1000}>
          {(state: string) => (
            <CheckboxWrapper state={state}>
              <CheckboxLabel onChange={() => setIsDraggable(!isDraggable)}>
                <CheckboxInput />
                <CheckboxMark isDraggable={isDraggable} />
                draggable
              </CheckboxLabel>
            </CheckboxWrapper>
          )}
        </Transition>

        <CardsContainer>
          {favLoading
            ? favLocations &&
              favLocations.map((item: any, index: number) => (
                <LoaderFav key={index} transitionDelay={index * 0.3} />
              ))
            : favWeather &&
              favWeather?.sort(sortCards).map((card: any, index: number) => (
                <LocationCardContainer
                  key={card.id}
                  draggable={isDraggable}
                  onDragStart={(e) => isDraggable && dragStartHandler(e, card)}
                  onDragLeave={(e) => isDraggable && dragEndHandler(e)}
                  onDragEnd={(e) => isDraggable && dragEndHandler(e)}
                  onDragOver={(e) => isDraggable && dragOverHandler(e)}
                  onDrop={(e) => isDraggable && dropHandler(e, card)}
                  isDraggable={isDraggable}
                >
                  <LocationCard
                    card={card}
                    coords={coords}
                    setCurrentLocation={setCurrentLocation}
                    favLocations={favLocations}
                    setFavLocations={setFavLocations}
                    favWeather={favWeather}
                    setFavWeather={setFavWeather}
                    isDraggable={isDraggable}
                  />
                </LocationCardContainer>
              ))}
        </CardsContainer>
        <CardIconContainer onClick={focusHandler}>
          <IconPlus />
        </CardIconContainer>
      </Container>
    </WeatherApp>
  );
};

export { SearchPage };

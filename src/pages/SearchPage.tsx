import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Variables*/
import { bgColors, gradients, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';
import { ReactComponent as IconPlus } from '../assets/images/icon_plus.svg';
import { ReactComponent as IconDots } from '../assets/images/icon_dots.svg';

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

const shake = keyframes`
   0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
`;

const LocationCardContainer = styled.div<{ isDraggable: boolean }>`
  position: relative;
  display: flex;
  align-self: center;
  width: calc(100% - 10px);
  margin: 0 auto;
  animation: ${(p) =>
    p.isDraggable
      ? css`
          ${shake} 1s linear infinite
        `
      : 'none'};
`;

const DotsContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 5px;
  padding: 5px;
  height: fit-content;
`;

const PopUp = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-10%, -120%);
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 600;
  background: ${colors.lightColor};
  color: ${colors.cardsLocationColor};
  border: 1px solid ${colors.cardsLocationColor};
  border-radius: 10px;
  z-index: 1000;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    right: 10px;
    border: 10px solid transparent;
    border-bottom: none;
    border-top: 16px solid ${colors.lightColor};
  }
  &:before {
    content: '';
    position: absolute;
    bottom: -17px;
    right: 10px;
    border: 10px solid transparent;
    border-bottom: none;
    border-top: 16px solid ${colors.cardsLocationColor};
  }
`;

const PopUpItems = styled.li`
  padding: 7px 10px;
  cursor: pointer;
  transition: background-color 1s ease;
  &:first-child {
    border-bottom: 1px solid ${colors.cardsLocationColor};
  }
`;

const LoaderFav = styled(SkeletonLoader)<{ transitionDelay: number }>`
  height: 80px;
  border-radius: 16px;
  margin-bottom: 10px;
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
  setFavLocations,
  coords,
}: SearchPageProps) => {
  const [favWeather, setFavWeather] = useState<any>([]);
  const [favLoading, setFavLoading] = useState<boolean>();
  const [currentCard, setCurrentCard] = useState<null | any>(null);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

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
    // console.log(`array`, favArray);
    return favArray;
  };

  useEffect(() => {
    setFavLoading(true);
    const favWeatherArray: any = [];
    Promise.all(getFavArray()).then((res) => {
      res.forEach((item, index) => {
        favWeatherArray.push({
          order: index,
          ...item,
          id: index,
          open: false,
        });
      });
      setFavWeather(favWeatherArray);
      setFavLoading(false);
    });
  }, [currentLocation]);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: any) => {
    setCurrentCard(card);
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
    setIsDraggable(false);
  };

  const sortCards = (a: { order: number }, b: { order: number }) => {
    if (a && b) {
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  useEffect(() => {
    console.log(`locations`, favLocations);
  }, [favLocations]);

  useEffect(() => {
    console.log(`weather`, favWeather);
  }, [favWeather]);

  const toggleOpen = (index: number) => {
    let arrCopy = [...favWeather];
    arrCopy[index].open
      ? (arrCopy[index].open = false)
      : (arrCopy[index].open = true);
    console.log(arrCopy[index].open);
    setFavWeather([...favWeather]);
  };

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
        <CardsContainer>
          {favLoading
            ? favLocations &&
              favLocations.map((item: any, index: number) => (
                <LoaderFav key={index} transitionDelay={index * 0.3} />
              ))
            : favWeather.length > 0 &&
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
                  <Link
                    to='/card'
                    onClick={() => {
                      setCurrentLocation({ value: favLocations[index] });
                    }}
                    style={{ width: '100%' }}
                  >
                    <LocationCard card={card} coords={coords} />
                  </Link>
                  <DotsContainer onClick={() => toggleOpen(card.id)}>
                    <IconDots />
                  </DotsContainer>
                  {card.open && !isDraggable && (
                    <PopUp>
                      <PopUpItems
                        onClick={() => {
                          toggleOpen(card.id);
                          setFavWeather(
                            favWeather.filter((p: any) => p.id !== card.id)
                          );
                          setFavLocations(
                            favLocations.filter(
                              (p: any) => p !== favLocations[index]
                            )
                          );
                        }}
                      >
                        Delete
                      </PopUpItems>
                      <PopUpItems
                        onClick={() => {
                          toggleOpen(card.id);
                          setIsDraggable(!isDraggable);
                        }}
                      >
                        Reorder
                      </PopUpItems>
                    </PopUp>
                  )}
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

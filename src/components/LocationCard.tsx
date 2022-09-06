import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as GeoMark } from '../assets/images/icon_geo.svg';
import { ReactComponent as IconDots } from '../assets/images/icon_dots.svg';
import { StyledFlex } from '../styles/StyledFlex';
import { useState } from 'react';

const shake = keyframes`
    0% { transform: translateY(0) }
  25% { transform: translateY(2px) }
  50% { transform: translateY(-2px) }
  75% { transform: translateY(2px) }
  100% { transform: translateY(0) }
`;

const CardWrapper = styled.div<{
  state: undefined | string;
  isDraggable: boolean;
}>`
  background: ${bgColors.bgLightColor};
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  line-height: 20px;
  margin: 0 auto;
  opacity: ${({ state }) =>
    state === 'exiting' || state === 'exited' ? '1' : '0'};
  height: ${({ state }) =>
    state === 'exiting' || state === 'exited' ? '80px' : '0'};
  transform: scaleY(
    ${({ state }) => (state === 'exiting' || state === 'exited' ? '1' : '0')}
  );
  user-select: none;
  transition: all 1s ease;
  animation: ${({ isDraggable }) =>
    isDraggable
      ? css`
          ${shake} 2s linear infinite
        `
      : 'none'};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const CardContainerRight = styled(CardContainer)`
  padding-right: 10px;
`;

const CardCity = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.cardsLocationColorMain};
  margin-right: 10px;
`;

const CardIconContainer = styled.div`
  display: flex;
`;

const CardIcon = styled.img`
  width: 30px;
`;

const CardTempContainer = styled.div`
  display: flex;
  color: ${colors.cardsLocationColor};
  gap: 3px;
  align-self: flex-start;
`;

const CardTemp = styled.span``;

const CardWeatherDescription = styled.div`
  color: ${colors.cardsLocationColor};
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
  z-index: 100000;
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

const DotsContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 5px;
  padding: 5px;
  height: fit-content;
`;

interface LocationCardProps {
  card: {
    name: string;
    main: {
      temp_min: number;
      temp_max: number;
    };
    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    id: number;
  };
  coords: {
    lon: string;
    lat: string;
  };
  setCurrentLocation: (currentLocation: any) => void;
  favLocations: any;
  setFavLocations: (favLocations: any) => void;
  favWeather: any;
  setFavWeather: (favWeather: any) => void;
  isDraggable: boolean;
}

const LocationCard = ({
  card,
  coords,
  setCurrentLocation,
  favLocations,
  setFavLocations,
  favWeather,
  setFavWeather,
  isDraggable,
}: LocationCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCardAnimated, setIsCardAnimated] = useState<boolean>(false);
  return (
    <Transition in={isCardAnimated} timeout={1000}>
      {(state: string) => (
        <CardWrapper state={state} isDraggable={isDraggable}>
          <CardContainer>
            <StyledFlex>
              <CardCity>{card?.name}</CardCity>
              {card?.coord.lon.toFixed(1) === coords.lon &&
                card?.coord.lat.toFixed(1) === coords.lat && (
                  <CardIconContainer>
                    <GeoMark />
                  </CardIconContainer>
                )}
            </StyledFlex>
            <CardTempContainer>
              <CardTemp>{card?.main?.temp_min.toFixed(1)}°</CardTemp>/
              <CardTemp>{card?.main?.temp_max.toFixed(1)}°</CardTemp>
            </CardTempContainer>
          </CardContainer>
          <CardContainerRight>
            <CardIconContainer>
              <CardIcon
                alt={card?.weather[0]?.description}
                src={
                  card?.weather[0]?.icon &&
                  require(`../assets/images/weatherCurrentIcons/${card?.weather[0]?.icon}.png`)
                }
              />
            </CardIconContainer>
            <CardWeatherDescription>
              {card?.weather[0].description}
            </CardWeatherDescription>
          </CardContainerRight>
          <DotsContainer
            onClick={() => {
              !isDraggable && setIsOpen(!isOpen);
            }}
          >
            <IconDots />
          </DotsContainer>
          {isOpen && !isDraggable && (
            <PopUp onClick={() => setIsOpen(!isOpen)}>
              <PopUpItems
                onClick={() => {
                  setIsCardAnimated(true);
                  setTimeout(() => {
                    setFavWeather(
                      favWeather.filter((p: any) => p.id !== card.id)
                    );
                    setFavLocations(
                      favLocations.filter(
                        (p: any) => p !== favLocations[card.id]
                      )
                    );
                  }, 1000);
                }}
              >
                Delete
              </PopUpItems>
              <PopUpItems>
                <Link
                  to='/card'
                  onClick={() => {
                    setCurrentLocation({
                      value: favLocations[card.id],
                    });
                  }}
                >
                  to Card
                </Link>
              </PopUpItems>
            </PopUp>
          )}
        </CardWrapper>
      )}
    </Transition>
  );
};

export { LocationCard };

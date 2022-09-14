/*Import React*/
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import { useState } from 'react';

/*Import Styles*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as GeoMark } from '../assets/images/icon_geo.svg';
import { ReactComponent as IconDots } from '../assets/images/icon_dots.svg';
import { StyledFlex } from '../styles/StyledFlex';

/*Import Types*/
import {
  FavCardProps,
  CoordsProps,
  CurrentLocationProps,
} from '../types/types';

const shake = keyframes`
    0% { transform: translateY(0) }
  25% { transform: translateY(2px) }
  50% { transform: translateY(-2px) }
  75% { transform: translateY(2px) }
  100% { transform: translateY(0) }
`;

interface CardWrapperProps {
  state: undefined | string;
  isDraggable: boolean;
  isOpen: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  background: ${bgColors.bgLightColor};
  width: ${({ isOpen, isDraggable }) =>
    isOpen && !isDraggable ? '70%' : '100%'};
  height: ${({ isOpen, isDraggable }) =>
    isOpen && !isDraggable ? '100px' : '80px'};
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  line-height: 20px;
  margin: 0;
  opacity: ${({ state }) =>
    state === 'exiting' || state === 'exited' ? '1' : '0'};
  min-height: ${({ state }) =>
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

const CardContainerLeft = styled(CardContainer)<{
  isOpen: boolean;
  isDraggable: boolean;
}>`
  max-width: ${({ isOpen, isDraggable }) =>
    isOpen && !isDraggable ? '130px' : '250px'};
  transition: all 1s ease;
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
  text-align: end;
  color: ${colors.cardsLocationColor};
`;

const PopUp = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(120%, 10%);
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
    top: 8px;
    left: -15px;
    border: 10px solid transparent;
    border-left: none;
    border-right: 16px solid ${colors.lightColor};
  }
  &:before {
    content: '';
    position: absolute;
    top: 8px;
    left: -17px;
    border: 10px solid transparent;
    border-left: none;
    border-right: 16px solid ${colors.cardsLocationColor};
  }
`;

const PopUpItems = styled.li`
  padding: 7px 7px;
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

const Overlay = styled.div`
  position: absolute;
  display: flex;
  top: -15px;
  right: -20px;
  background-color: ${colors.lightColor};
  padding: 4px;
  border: 1px solid ${colors.cardsLocationColor};
  font-size: x-large;
  cursor: pointer;
`;

interface LocationCardProps {
  card: FavCardProps;
  coords: CoordsProps;
  currentLocation: CurrentLocationProps;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<CurrentLocationProps | null>
  >;
  favLocations: string[];
  setFavLocations: React.Dispatch<React.SetStateAction<string[]>>;
  favWeather: FavCardProps[];
  setFavWeather: React.Dispatch<React.SetStateAction<FavCardProps[]>>;
  isDraggable: boolean;
}

const LocationCard = ({
  card,
  coords,
  currentLocation,
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
        <CardWrapper state={state} isDraggable={isDraggable} isOpen={isOpen}>
          <CardContainerLeft isOpen={isOpen} isDraggable={isDraggable}>
            <StyledFlex>
              <CardCity>{card?.name}</CardCity>
              {card?.coord.lon.toFixed(1) === coords?.lon &&
                card?.coord.lat.toFixed(1) === coords?.lat && (
                  <CardIconContainer>
                    <GeoMark />
                  </CardIconContainer>
                )}
            </StyledFlex>
            <CardTempContainer>
              <CardTemp>{card?.main?.temp_min.toFixed(1)}°</CardTemp>/
              <CardTemp>{card?.main?.temp_max.toFixed(1)}°</CardTemp>
            </CardTempContainer>
          </CardContainerLeft>
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
              <Overlay>×</Overlay>
              <PopUpItems
                onClick={() => {
                  setIsCardAnimated(true);
                  setTimeout(() => {
                    setFavWeather(
                      favWeather.filter((p: { id: number }) => p.id !== card.id)
                    );
                    setFavLocations(
                      favLocations.filter(
                        (p: string) => p !== favLocations[card.id]
                      )
                    );
                    if (favLocations[card.id] === currentLocation?.value) {
                      setCurrentLocation(null);
                    }
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
                      label: '',
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

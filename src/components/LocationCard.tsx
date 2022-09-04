import styled from 'styled-components';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as GeoMark } from '../assets/images/icon_geo.svg';
import { StyledFlex } from '../styles/StyledFlex';

const CardWrapper = styled.div`
  background: ${bgColors.bgLightColor};
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  line-height: 20px;
  margin: 0 auto;
  height: 80px;
  user-select: none;
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
  };
  coords: {
    lon: string;
    lat: string;
  };
}

const LocationCard = ({ card, coords }: LocationCardProps) => {
  return (
    <CardWrapper>
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
    </CardWrapper>
  );
};

export { LocationCard };

import styled from 'styled-components';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as IconHourly1 } from '../assets/images/icon_hourly_1.svg';

const CardWrapper = styled.div`
  background: ${bgColors.bgLightColor};
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CardCity = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.cardsLocationColorMain};
`;

const CardIconContainer = styled.div`
  display: flex;
  & svg path {
    fill: ${colors.cardsLocationColorMain};
  }
`;

const CardTempContainer = styled.div`
  display: flex;
  color: ${colors.cardsLocationColor};
  gap: 3px;
`;

const CardTemp = styled.span``;

const CardWeatherDescription = styled.div`
  color: ${colors.cardsLocationColor};
`;

const LocationCards = () => {
  return (
    <CardWrapper>
      <CardContainer>
        <CardCity>Malang</CardCity>
        <CardTempContainer>
          <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
        </CardTempContainer>
      </CardContainer>
      <CardContainer>
        <CardIconContainer>
          <IconHourly1 />
        </CardIconContainer>
        <CardWeatherDescription>Heavy rain</CardWeatherDescription>
      </CardContainer>
    </CardWrapper>
  );
};

export { LocationCards };

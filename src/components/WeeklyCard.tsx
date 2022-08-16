import styled from 'styled-components';

/*Import Variables*/
import { bgColors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as IconHourly1 } from '../assets/images/icon_hourly_1.svg';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';

const CardWrapper = styled.div`
  background: ${bgColors.bgMain};
`;

const CardDate = styled.div`
  display: flex;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardMini = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
`;

const CardMiniContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardDay = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const CardIconContainer = styled.div`
  display: flex;
`;

const CardTempContainer = styled.div`
  display: flex;
  gap: 3px;
`;

const CardTemp = styled.span``;

const CardRain = styled.div``;

const WeeklyCard = () => {
  return (
    <CardWrapper>
      <StyledFlex direction='column'>
        <CardDate>Forcats for 7 Days</CardDate>
        <CardInfoContainer>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
          <CardMini>
            <CardDay>Mon</CardDay>
            <CardMiniContainer>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardRain>74% rain</CardRain>
            </CardMiniContainer>
            <CardTempContainer>
              <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
            </CardTempContainer>
          </CardMini>
        </CardInfoContainer>
      </StyledFlex>
    </CardWrapper>
  );
};

export { WeeklyCard };

import styled from 'styled-components';

/*Import Variables*/
import { bgColors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as IconHourly1 } from '../assets/images/icon_hourly_1.svg';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';

const CardWrapper = styled.div`
  background: ${bgColors.bgMain};
  margin-bottom: 16px;
  width: 100%;
`;

const CardDateContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  gap: 10px;
`;

const CardDate = styled.span`
  font-size: inherit;
`;

const CardInfoContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  overflow-x: scroll;
  scrollbar-width: 2px;
  &::-webkit-scrollbar {
    background: #fff;
    height: 7px;
    background-color: ${bgColors.bgMain};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${bgColors.bgMain};
    height: 7px;
    border-radius: 5px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: #223c50;
  }
`;

const CardMiniContainer = styled.div`
  display: flex;
`;

const CardMini = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
`;

const CardTime = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
`;

const CardIconContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const CardTempContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  gap: 3px;
`;

const CardTemp = styled.span``;

const CardRain = styled.div``;

const HourlyCard = () => {
  return (
    <CardWrapper>
      <StyledFlex direction='column'>
        <CardDateContainer>
          <CardDate>Sunday</CardDate>|<CardDate>Nov 14</CardDate>
        </CardDateContainer>
        <CardInfoContainer>
          <CardMiniContainer>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
            <CardMini>
              <CardTime>Now</CardTime>
              <CardIconContainer>
                <IconHourly1 />
              </CardIconContainer>
              <CardTempContainer>
                <CardTemp>20°</CardTemp>/<CardTemp>24°</CardTemp>
              </CardTempContainer>
              <CardRain>74% rain</CardRain>
            </CardMini>
          </CardMiniContainer>
        </CardInfoContainer>
      </StyledFlex>
    </CardWrapper>
  );
};

export { HourlyCard };

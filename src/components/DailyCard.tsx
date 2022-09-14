/*Import React*/
import styled from 'styled-components';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';

/*Import Types*/
import { CardOtherProps, CardListProps } from '../types/types';

const CardWrapper = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  width: 100%;
  min-height: 375px;
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
  min-height: 339px;
  width: 100%;
`;

const CardMini = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  border-top: 1px solid ${(props) => props.theme.color};
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.color};
  }
`;

const CardMiniContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2px;
`;

const CardDay = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  min-width: 35px;
`;

const CardIconContainer = styled.div`
  display: flex;
`;

const CardIcon = styled.img`
  width: 30px;
`;

const CardTempContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 3px;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  min-width: 79px;
`;

const CardTemp = styled.span``;

const CardText = styled.p``;

interface DailyCardProps {
  dataDaily: CardOtherProps;
}

const WEEK_DAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

const DailyCard = ({ dataDaily }: DailyCardProps) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek - 1, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek - 1)
  );

  return (
    <CardWrapper>
      <StyledFlex direction='column'>
        <CardDate>Forcast for 5 Days</CardDate>
        <CardInfoContainer>
          {dataDaily &&
            dataDaily?.list
              ?.filter(
                (elem: CardListProps) => dataDaily.list.indexOf(elem) % 8 === 0
              )
              ?.map((item: CardListProps, index: number) => (
                <CardMini key={index}>
                  <CardDay>{forecastDays[index]}</CardDay>
                  <CardMiniContainer>
                    <CardIconContainer>
                      <CardIcon
                        alt={item?.weather[0].description}
                        src={require(`../assets/images/weatherOtherIcons/${item?.weather[0].icon}.svg`)}
                      />
                    </CardIconContainer>
                    <CardText>{item?.weather[0].description}</CardText>
                  </CardMiniContainer>
                  <CardTempContainer>
                    <CardTemp>{item?.main.temp_min.toFixed(1)}°</CardTemp>/
                    <CardTemp>{item?.main.temp_max.toFixed(1)}°</CardTemp>
                  </CardTempContainer>
                </CardMini>
              ))}
        </CardInfoContainer>
      </StyledFlex>
    </CardWrapper>
  );
};

export { DailyCard };

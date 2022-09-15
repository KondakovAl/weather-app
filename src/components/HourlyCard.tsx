/*Import React*/
import styled from 'styled-components';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';
import { getFormatedHours } from '../helpers/getFormatedDate';
import { useEffect, useState, memo } from 'react';

/*Import Types*/
import { DateProps, CardOtherProps, CardListProps } from '../types/types';

const CardWrapper = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  margin-bottom: 16px;
  width: 100%;
  min-height: 157px;
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

const CardIcon = styled.img`
  width: 30px;
`;

const CardInfoContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  overflow-x: scroll;
  scrollbar-width: 2px;
  &::-webkit-scrollbar {
    background: #fff;
    height: 7px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    height: 7px;
    border-radius: 5px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: #223c50;
  }
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

interface HourlyCardProps {
  dataHourly: CardOtherProps;
  date: DateProps;
}

const HourlyCard = memo(({ dataHourly, date }: HourlyCardProps) => {
  const [hours, setHours] = useState<string[]>([]);

  useEffect(() => {
    const arr: number[] = [];
    dataHourly?.list
      .slice(0, 12)
      .forEach((item: CardListProps) => arr.push(item.dt));
    setHours(getFormatedHours(arr, dataHourly?.city?.timezone));
  }, [date, dataHourly?.list, dataHourly?.city?.timezone]);

  return (
    <CardWrapper>
      <StyledFlex direction='column'>
        <CardDateContainer>
          <CardDate>{date?.weekday}</CardDate>|
          <CardDate>{date?.monthAndDay}</CardDate>
        </CardDateContainer>
        <CardInfoContainer>
          {dataHourly &&
            dataHourly?.list
              ?.slice(0, 12)
              ?.map((item: CardListProps, index: number) => (
                <CardMini key={index}>
                  {hours && <CardTime>{hours[index]}</CardTime>}
                  <CardIconContainer>
                    <CardIcon
                      alt={item?.weather[0].description}
                      src={require(`../assets/images/weatherOtherIcons/${item?.weather[0].icon}.svg`)}
                    />
                  </CardIconContainer>
                  <CardTempContainer>
                    <CardTemp>{item?.main.temp.toFixed(1)}°</CardTemp>
                  </CardTempContainer>
                  <CardRain>{item?.weather[0].main}</CardRain>
                </CardMini>
              ))}
        </CardInfoContainer>
      </StyledFlex>
    </CardWrapper>
  );
});

export { HourlyCard };

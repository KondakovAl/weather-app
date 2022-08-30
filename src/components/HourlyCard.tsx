import styled from 'styled-components';

/*Import Variables*/
import { bgColors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as IconHourly1 } from '../assets/images/icon_hourly_1.svg';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';
import { getDate, getFormatedHours } from '../helpers/getFormatedDate';
import { useEffect, useState } from 'react';

const CardWrapper = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
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
  dataHourly: any;
  loading: boolean;
  date: {
    hour: number;
    time: string;
    weekday: string;
    monthAndDay: string;
  };
}

const HourlyCard = ({ dataHourly, loading, date }: HourlyCardProps) => {
  const [hours, setHours] = useState<any>();

  useEffect(() => {
    setHours(
      getFormatedHours(dataHourly?.list[0].dt, dataHourly?.city.timezone)
    );
    console.log(hours);
  }, [hours]);

  return (
    <CardWrapper>
      <StyledFlex direction='column'>
        <CardDateContainer>
          <CardDate>{date?.weekday}</CardDate>|
          <CardDate>{date?.monthAndDay}</CardDate>
        </CardDateContainer>
        <CardInfoContainer>
          {dataHourly &&
            dataHourly?.list.slice(0, 7).map((item: any, index: number) => (
              <CardMini key={index}>
                <CardTime>{item?.dt_txt.substr(-8, 5)}</CardTime>
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
};

export { HourlyCard };

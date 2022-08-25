import styled from 'styled-components';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/

import { ReactComponent as IconHourly1 } from '../assets/images/icon_hourly_1.svg';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';
import { Key, useEffect } from 'react';
import { Loader } from '../styles/Loader';

const CardWrapper = styled.div`
  background: ${bgColors.bgMain};
  width: 100%;
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
  border-top: 1px solid ${colors.lightColor};
  &:last-child {
    border-bottom: 1px solid ${colors.lightColor};
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
  gap: 3px;
`;

const CardTemp = styled.span``;

const CardText = styled.p``;

const LoaderDaily = styled(Loader)`
  width: 50px;
  height: 50px;
  border: 4px solid white;
  border-left: 6px solid ${bgColors.bgMain};
  margin: auto;
`;

interface DailyCardProps {
  dataDaily: any;
  loading: boolean;
}

const WEEK_DAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

const DailyCard = ({ dataDaily, loading }: DailyCardProps) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek - 1, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek - 1)
  );

  /*Each 8 item in array for next 5 days*/
  useEffect(() => {
    const filtredArr = dataDaily?.list.filter(
      (elem: any) => dataDaily.list.indexOf(elem) % 8 == 0
    );
    console.log(filtredArr);
  }, [dataDaily]);

  console.log(forecastDays);

  return (
    <CardWrapper>
      <StyledFlex direction='column'>
        <CardDate>Forcast for 5 Days</CardDate>
        <CardInfoContainer>
          {loading ? (
            <LoaderDaily />
          ) : (
            <>
              {dataDaily &&
                dataDaily?.list
                  .filter((elem: any) => dataDaily.list.indexOf(elem) % 8 == 0)
                  .map((item: any, index: number) => (
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
                        {/* {item?.main.temp.toFixed(1)}° */}
                        <CardTemp>{item?.main.temp_min.toFixed(1)}°</CardTemp>/
                        <CardTemp>{item?.main.temp_max.toFixed(1)}°</CardTemp>
                      </CardTempContainer>
                    </CardMini>
                  ))}
            </>
          )}
        </CardInfoContainer>
      </StyledFlex>
    </CardWrapper>
  );
};

export { DailyCard };
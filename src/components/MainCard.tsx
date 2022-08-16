import styled from 'styled-components';

/*Import Variables*/
import { gradients } from '../styles/variables';
import { colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconPlus } from '../assets/images/icon_plus.svg';
import { ReactComponent as IconPagination } from '../assets/images/icon_pagination.svg';
import { ReactComponent as IconMenu } from '../assets/images/icon_menu.svg';
import { ReactComponent as IconDegree } from '../assets/images/icon_degree.svg';
import { ReactComponent as IconParamWind } from '../assets/images/icon_param_wind.svg';
import { ReactComponent as IconParamRain } from '../assets/images/icon_param_rain.svg';
import { ReactComponent as IconParamPressure } from '../assets/images/icon_param_pressure.svg';
import { ReactComponent as IconParamHumidity } from '../assets/images/icon_param_humidity.svg';
import ImgWeather from '../assets/images/img_weather.png';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';

const CardWrapper = styled.div`
  max-width: 358px;
  margin: 0 auto 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: ${gradients.main};
  border-radius: 30px;
`;

const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const CardTitle = styled.h1`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 5px;
`;

const PaginationList = styled.ul`
  display: flex;
  gap: 4px;
`;

interface PaginationListItemProps {
  active?: boolean;
}

const PaginationListItem = styled.li<PaginationListItemProps>`
  display: flex;
  & svg {
    fill: ${(p) => (p.active ? 'white' : '')};
    transform: fill 0.3s ease-in;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const CardMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 25px;
`;

const CardMainImgContainer = styled.div`
  display: flex;
`;

const CardMainImg = styled.img.attrs({
  src: ImgWeather,
})`
  display: block;
`;

const CardMainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardDateContainer = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  gap: 10px;
  margin-bottom: 16px;
`;

const CardDate = styled.span`
  font-size: inherit;
`;

const CardTemperature = styled.span`
  font-weight: 600;
  font-size: 72px;
  line-height: 87px;
  display: flex;
`;

const CardText = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const ParamsContainer = styled.div`
  border-top: 1px solid ${colors.lightColor};
  padding-top: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: start;
  row-gap: 25px;
`;

const ParamsItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  padding: 0 15px;
`;

const ParamsItemIcon = styled.div`
  display: flex;
  align-items: center;
  grid-area: 1 / 1 / 3 / 2;
`;

const ParamsItemTextNum = styled.span`
  grid-area: 1 / 2 / 2 / 3;
`;
const ParamsItemTextDescription = styled.span`
  grid-area: 2 / 2 / 3 / 3;
`;

const MainCard = () => {
  return (
    <CardWrapper>
      <CardContainer>
        <CardHeader>
          <StyledIconWrapper>
            <IconPlus />
          </StyledIconWrapper>
          <StyledFlex direction='column' align='center'>
            <CardTitle>Malang</CardTitle>
            <PaginationList>
              <PaginationListItem active>
                <IconPagination />
              </PaginationListItem>
              <PaginationListItem>
                <IconPagination />
              </PaginationListItem>
              <PaginationListItem>
                <IconPagination />
              </PaginationListItem>
            </PaginationList>
          </StyledFlex>
          <StyledIconWrapper>
            <IconMenu />
          </StyledIconWrapper>
        </CardHeader>
        <CardMain>
          <CardMainImgContainer>
            <CardMainImg />
          </CardMainImgContainer>
          <CardMainInfoContainer>
            <CardDateContainer>
              <CardDate>Sunday</CardDate>|<CardDate>Nov 14</CardDate>
            </CardDateContainer>
            <CardTemperature>
              24
              <IconDegree />
            </CardTemperature>
            <CardText>Heavy rain</CardText>
          </CardMainInfoContainer>
        </CardMain>
        <ParamsContainer>
          <ParamsItem>
            <ParamsItemIcon>
              <IconParamWind />
            </ParamsItemIcon>
            <ParamsItemTextNum>3.7 km/h</ParamsItemTextNum>
            <ParamsItemTextDescription>Wind</ParamsItemTextDescription>
          </ParamsItem>
          <ParamsItem>
            <ParamsItemIcon>
              <IconParamRain />
            </ParamsItemIcon>
            <ParamsItemTextNum>74%</ParamsItemTextNum>
            <ParamsItemTextDescription>
              Chance of rain
            </ParamsItemTextDescription>
          </ParamsItem>
          <ParamsItem>
            <ParamsItemIcon>
              <IconParamPressure />
            </ParamsItemIcon>
            <ParamsItemTextNum>83%</ParamsItemTextNum>
            <ParamsItemTextDescription>Humidity 83%</ParamsItemTextDescription>
          </ParamsItem>
          <ParamsItem>
            <ParamsItemIcon>
              <IconParamHumidity />
            </ParamsItemIcon>
            <ParamsItemTextNum>1010 mbar</ParamsItemTextNum>
            <ParamsItemTextDescription>Pressure</ParamsItemTextDescription>
          </ParamsItem>
        </ParamsContainer>
      </CardContainer>
    </CardWrapper>
  );
};

export { MainCard };

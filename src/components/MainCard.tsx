/*Import React*/
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Images*/
import { ReactComponent as IconPlus } from '../assets/images/icon_plus.svg';
import { ReactComponent as IconAdd } from '../assets/images/icon_add.svg';
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';
import { ReactComponent as IconDegree } from '../assets/images/icon_degree.svg';
import { ReactComponent as IconParamWind } from '../assets/images/icon_param_wind.svg';
import { ReactComponent as IconParamCloudness } from '../assets/images/icon_param_cloudness.svg';
import { ReactComponent as IconParamPressure } from '../assets/images/icon_param_pressure.svg';
import { ReactComponent as IconParamHumidity } from '../assets/images/icon_param_humidity.svg';

/*Import Types*/
import { DateProps, CurrentLocationProps, CardMainProps } from '../types/types';

const CardWrapper = styled.div`
  width: calc(100% - 40px);
  margin: 0 auto 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 353px;
  padding: 16px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
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
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  & svg {
    display: block;
    & path {
      stroke: ${(props) => props.theme.color};
    }
  }
`;

const StyledIconWrapperDeg = styled.div`
  display: flex;
  & circle {
    stroke: ${(props) => props.theme.color};
  }
`;

const StyledIconWrapperArrow = styled.div`
  transform: rotate(180deg);

  & svg {
    display: block;
    & path {
      fill: ${(props) => props.theme.color};
    }
  }
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

const CardMainImg = styled.img`
  display: block;
  width: 130px;
`;

const CardMainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 130px;
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

const CardText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
`;

const ParamsContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.color};
  padding-top: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 25px 25px;
`;

const ParamsItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px 10px;
`;

const ParamsItemIcon = styled.div`
  transition: transform 1s ease-in;
  display: flex;
  align-items: center;
  grid-area: 1 / 1 / 3 / 2;
  & svg path {
    fill: ${(props) => props.theme.color};
  }
`;

const ParamsItemIconHum = styled(ParamsItemIcon)`
  & svg path {
    stroke: ${(props) => props.theme.color};
  }
`;

interface ParamsItemIconWindProps {
  rotation: number;
}

const ParamsItemIconWind = styled(ParamsItemIcon)<ParamsItemIconWindProps>`
  transform: rotate(${(p) => p.rotation}deg);
`;

const ParamsItemTextNum = styled.span`
  grid-area: 1 / 2 / 2 / 3;
`;
const ParamsItemTextDescription = styled.span`
  grid-area: 2 / 2 / 3 / 3;
`;

interface MainCardProps {
  currentLocation: CurrentLocationProps;
  dataCurrent: CardMainProps;
  date: DateProps;
  favLocations: string[];
  setFavLocations: (favLocations: any) => void;
}

const MainCard = ({
  currentLocation,
  dataCurrent,
  date,
  favLocations,
  setFavLocations,
}: MainCardProps) => {
  /*Add or Remove cards from favorites*/
  const onHadleClick = () => {
    if (!favLocations.includes(currentLocation.value)) {
      setFavLocations((arr: any) => [...arr, currentLocation.value]);
    } else {
      setFavLocations(
        favLocations.filter((p: string) => p !== currentLocation.value)
      );
    }
  };

  return (
    <CardWrapper>
      <CardContainer>
        <CardHeader>
          <StyledIconWrapper
            onClick={() => {
              onHadleClick();
            }}
          >
            {!favLocations.includes(currentLocation.value) ? (
              <IconPlus />
            ) : (
              <IconAdd />
            )}
          </StyledIconWrapper>

          <CardTitle>{dataCurrent?.name}</CardTitle>

          <Link to='/'>
            <StyledIconWrapperArrow>
              <IconArrow />
            </StyledIconWrapperArrow>
          </Link>
        </CardHeader>
        <CardMain>
          <CardMainImgContainer>
            <CardMainImg
              alt={dataCurrent?.weather[0].description}
              src={require(`../assets/images/weatherCurrentIcons/${dataCurrent?.weather[0].icon}.png`)}
            />
          </CardMainImgContainer>
          <CardMainInfoContainer>
            <CardDateContainer>
              <CardDate>{date?.weekday}</CardDate>|
              <CardDate>{date?.time}</CardDate>
            </CardDateContainer>
            <CardTemperature>
              {Math.round(dataCurrent?.main.temp)}
              <StyledIconWrapperDeg>
                <IconDegree />
              </StyledIconWrapperDeg>
            </CardTemperature>
            <CardText>{dataCurrent?.weather[0].description}</CardText>
          </CardMainInfoContainer>
        </CardMain>
        <ParamsContainer>
          <ParamsItem>
            <ParamsItemIconWind rotation={dataCurrent?.wind.deg}>
              <IconParamWind />
            </ParamsItemIconWind>
            <ParamsItemTextNum>
              {dataCurrent?.wind.speed} km/h
            </ParamsItemTextNum>
            <ParamsItemTextDescription>Wind</ParamsItemTextDescription>
          </ParamsItem>
          <ParamsItem>
            <ParamsItemIcon>
              <IconParamCloudness />
            </ParamsItemIcon>
            <ParamsItemTextNum>{dataCurrent?.clouds.all}%</ParamsItemTextNum>
            <ParamsItemTextDescription>Cloudness</ParamsItemTextDescription>
          </ParamsItem>
          <ParamsItem>
            <ParamsItemIconHum>
              <IconParamPressure />
            </ParamsItemIconHum>
            <ParamsItemTextNum>{dataCurrent?.main.humidity}%</ParamsItemTextNum>
            <ParamsItemTextDescription>Humidity</ParamsItemTextDescription>
          </ParamsItem>
          <ParamsItem>
            <ParamsItemIcon>
              <IconParamHumidity />
            </ParamsItemIcon>
            <ParamsItemTextNum>
              {dataCurrent?.main.pressure} mbar
            </ParamsItemTextNum>
            <ParamsItemTextDescription>Pressure</ParamsItemTextDescription>
          </ParamsItem>
        </ParamsContainer>
      </CardContainer>
    </CardWrapper>
  );
};

export { MainCard };

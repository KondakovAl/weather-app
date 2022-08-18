import styled, { keyframes } from 'styled-components';
import { bgColors, colors } from '../styles/variables';

import { ReactComponent as CloudIcon } from '../assets/images/icon_pagenotfound_cloud.svg';

import water from '../assets/images/water.png';

const WeatherApp = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${bgColors.bgMain};
`;

const Text = styled.p`
  color: ${colors.cardsLocationColorMain};
  font-size: 32px;
  font-weight: 700;
  z-index: 5;
`;

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 5;
`;

const IconWrapperFirst = styled(IconWrapper)`
  width: 400px;
  top: -320px;
  left: -150px;
`;

const IconWrapperSecond = styled(IconWrapper)`
  width: 350px;
  top: -350px;
  left: 100px;
`;

interface RainProps {
  background: string;
}

const rainDrop = keyframes`
  0% {
   background-position: -10% -100% ;
  }

  100% {
    background-position: 10% 100% ;
  }
`;

const Rain = styled.div<RainProps>`
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  background: url(${(props) => props.background});

  animation: ${rainDrop} 0.3s linear infinite;
`;

const NotFoundPage = () => {
  return (
    <WeatherApp>
      <IconWrapperFirst>
        <CloudIcon />
      </IconWrapperFirst>
      <IconWrapperSecond>
        <CloudIcon />
      </IconWrapperSecond>
      <Rain background={water} />
      <Text>Page Not Found</Text>
    </WeatherApp>
  );
};

export { NotFoundPage };

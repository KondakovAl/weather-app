/*Import React*/
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Styles*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/
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

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 5;
`;

const IconWrapperFirst = styled(IconWrapper)`
  width: 400px;
  top: -330px;
  left: -95px;
`;

const IconWrapperSecond = styled(IconWrapper)`
  width: 350px;
  top: -350px;
  left: 160px;
`;

const rainDrop = keyframes`
  0% {
   background-position: -10% -100% ;
  }

  100% {
    background-position: 10% 100% ;
  }
`;

const Rain = styled.div<{ background: string }>`
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  background: url(${(props) => props.background});

  animation: ${rainDrop} 0.3s linear infinite;
`;

const TextContainer = styled.div`
  color: ${colors.cardsLocationColorMain};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const Text = styled.p`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const LinkText = styled.span`
  font-size: 16px;
  font-weight: 500;
  border: 1px solid ${colors.darkColor};
  border-radius: 10px;
  padding: 10px 15px;
  background: ${bgColors.bgLightColor};
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
      <TextContainer>
        <Text>No such location</Text>
        <Link to='/'>
          <LinkText>SEARCH</LinkText>
        </Link>
      </TextContainer>
    </WeatherApp>
  );
};

export { NotFoundPage };

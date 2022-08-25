import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Variables*/
import { bgColors, gradients } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';

/*Import Components*/
import { LocationCards } from '../components/LocationCards';
import { Search } from '../components/Search';
import { useEffect, useState } from 'react';

const WeatherApp = styled.div`
  height: 100%;
  padding: 15px;
  background-color: ${bgColors.bgLightColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
  padding: 16px;
  background: ${gradients.main};
  border-radius: 30px;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
  min-height: 32px;
`;

const CardTitle = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0 auto;
`;

interface StyledIconWrapperProps {
  currentLocation: any;
}

const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
  display: ${(p) => (p.currentLocation ? 'flex' : 'none')};
  cursor: pointer;
`;

interface SearchPageProps {
  currentLocation: {
    value: string;
    label: string;
  };
  setCurrentLocation: (currentLocation: string) => void;
}

const SearchPage = ({
  currentLocation,
  setCurrentLocation,
}: SearchPageProps) => {
  return (
    <WeatherApp>
      <Container>
        <CardHeader>
          <Link to='/card'>
            <StyledIconWrapper currentLocation={currentLocation}>
              <IconArrow />
            </StyledIconWrapper>
          </Link>
          <CardTitle>Manage Location</CardTitle>
        </CardHeader>
        <Search setCurrentLocation={setCurrentLocation} />
        <LocationCards />
      </Container>
    </WeatherApp>
  );
};

export { SearchPage };

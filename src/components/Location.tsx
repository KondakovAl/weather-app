import styled from 'styled-components';

/*Import Variables*/
import { gradients } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconArrow } from '../assets/images/icon_arrow.svg';

/*Import Components*/
import { LocationCards } from '../components/LocationCards';
import { Search } from '../components/Search';

const Wrapper = styled.div`
  /*Change to maxWidth!!*/
  width: 358px;
  margin: 0 auto;
  height: 100%;
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
`;

const CardTitle = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0 auto;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const Location = () => {
  return (
    <Wrapper>
      <Container>
        <CardHeader>
          <StyledIconWrapper>
            <IconArrow />
          </StyledIconWrapper>
          <CardTitle>Manage Location</CardTitle>
        </CardHeader>
        <Search />
        <LocationCards />
      </Container>
    </Wrapper>
  );
};

export { Location };

import styled from 'styled-components';

interface StyledFlexProps {
  direction?: string;
  align?: string;
  justify?: string;
  margin?: string;
}

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${(p) => p.direction || 'row'};
  align-items: ${(p) => p.align || 'flex-start'};
  justify-content: ${(p) => p.justify || 'flex-start'};
  margin: ${(p) => p.margin || '0'};
`;

export { StyledFlex };
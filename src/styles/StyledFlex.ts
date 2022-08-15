import { FC } from 'react';
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

// interface FlexProps {
//   direction?: string;
//   align?: string;
//   justify?: string;
//   margin?: string;
//   children?: React.ReactNode;
// }

// const Flex: FC<FlexProps> = ({ direction, align, justify, children }) => {
//   return (
//     <StyledFlex direction={direction} align={align} justify={justify}>
//       {children}
//     </StyledFlex>
//   );
// };

// export { Flex };

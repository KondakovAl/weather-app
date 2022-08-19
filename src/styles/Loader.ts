import styled, { keyframes } from "styled-components";
import { bgColors, colors } from "./variables";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border: 2px solid ${colors.inputColor};
  border-left: 3px solid ${colors.darkColor};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 10px auto;
`;

export {Loader};
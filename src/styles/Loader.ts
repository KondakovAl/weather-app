import styled, { keyframes } from "styled-components";
import { bgColors } from "./variables";

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
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid ${bgColors.bgMain};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 10px auto;
`;

export {Loader};
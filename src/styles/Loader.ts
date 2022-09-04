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

export const Loader = styled.div`
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

const wave = keyframes`
  to {
    background-position: 120% 0;
  }
`;

export const SkeletonLoader = styled.div`
  display: block;
  width: 100%;
  background: linear-gradient(
      to right,
      rgba(200, 200, 200, 0),
      rgba(200, 200, 200, 0.5) 50%,
      rgba(200, 200, 200, 0) 80%
    ),
    #ebebeb;
  background-size: 50px;
  background-repeat: repeat-y;
  background-position: -20% 0;
  animation: ${wave} 3s ease infinite;
  `;


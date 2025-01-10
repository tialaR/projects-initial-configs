import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

type SkeletonBoxContainerProps = {
  width: string;
};

export const SkeletonBoxContainer = styled.div<SkeletonBoxContainerProps>`
  width: ${({ width }) => width};
  height: 20px;
  background: linear-gradient(90deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 8px;
`;

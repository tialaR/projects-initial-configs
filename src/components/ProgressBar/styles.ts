import styled from 'styled-components';

type ProgressBarProps = {
  color: string;
  percentage: number | string;
  height?: string | number;
  width?: string | number;
};

export const ProgressBar = styled.div<ProgressBarProps>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width || "100%")};
  height: ${({ height }) => (typeof height === "number" ? `${height}px` : height || "0.5rem")};
  background: ${({ theme }) => theme.colors.grayScale.gray400};
  border-radius: 64px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ percentage }) =>
    typeof percentage === "number" ? `${percentage}%` : percentage || "0%"};
    background: ${({ color }) => color};
    transition: width 0.3s ease-in-out;
  }
`;


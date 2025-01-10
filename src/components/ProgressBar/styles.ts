import styled from 'styled-components';

type ProgressBarProps = {
    color: string;
    percentage: number;
    height?: string | number;
    width?: string | number;
};

export const ProgressBar = styled.div<ProgressBarProps> `
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '0.5rem'};
  background: ${({ theme }) => theme.colors.grayScale.gray400};
  border-radius: 64px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ percentage }) => percentage}%;
    background: ${({ color }) => color};
  }
`;

import styled from 'styled-components';

export const ChartContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 50%; 
  min-width: 12.5rem;
  align-items: center;
  justify-content: center;
`;

export const DonutChart = styled.div`
  width: 6.125rem;
  height: 6.125rem;
  background: conic-gradient(
    ${({ theme }) => theme.colors.status.gold} 10%, 
    ${({ theme }) => theme.colors.status.silver} 10% 30%,
    ${({ theme }) => theme.colors.status.bronze} 30% 100%
  );
  border-radius: 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3rem; 
    height: 3rem;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.colors.grayScale.white};
  }
`;


export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1.5rem;
`;

type LegendItemProps = {
  color: string;
};

export const LegendItem = styled.div<LegendItemProps>`
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.semiBold};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  p {
    all: unset;
    display: block;
    margin-right: 0.5rem;
    font-size: ${({ theme }) => theme.typography.title.t14.size};
    font-weight: ${({ theme }) => theme.typography.title.t14.bold};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
  }

  span {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 4px;
    background: ${({ color }) => color};
  }
`;

import styled from 'styled-components';

export const ReportContainer = styled.div`
    padding-left: 2.5rem;
    padding-right: 2.5rem;

    padding-bottom: 8rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h5`
  font-size: ${({ theme }) => theme.typography.heading.h5.size};
  font-weight: ${({ theme }) => theme.typography.heading.h5.bold};
  color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
  font-weight: ${({ theme }) => theme.typography.paragraph.p14.semiBold};
  color: ${({ theme }) => theme.colors.grayScale.gray800};
`;

export const DividerX = styled.div`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grayScale.gray300};
    width: 100%;
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
`

export const DividerY = styled.div`
    display: flex;
    align-self: center;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.grayScale.gray300};
    height: 10rem;
`

export const DonutContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const DonutChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    > div:first-child {
        padding-bottom: 1.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};

        > p {
            font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
            font-weight: ${({ theme }) => theme.typography.paragraph.p14.regular};
            color: ${({ theme }) => theme.colors.grayScale.gray900};
        }

        > h5 {
            font-size: ${({ theme }) => theme.typography.heading.h5.size};
            font-weight: ${({ theme }) => theme.typography.heading.h5.bold};
            color: ${({ theme }) => theme.colors.grayScale.gray900};
        }
    }
`

export const DonutChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

type DonutChartProps = {
  percentage: number;
  color: string;
};

export const DonutChart = styled.div<DonutChartProps>`
  width: 8.063rem;
  height: 8.063rem;
  background: conic-gradient(
    ${({ color }) => color} ${({ percentage }) => percentage}%,
    ${({ theme }) => theme.colors.grayScale.gray500} ${({ percentage }) => percentage}% 100%
  );
  border-radius: 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.colors.grayScale.white};
  }
`;

export const PercentageText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.bold};
  color: ${({ theme }) => theme.colors.grayScale.gray800};
  z-index: 1;
`;

type StyledSpanProps = {
  color: string;
};

export const StyledSpan = styled.span<StyledSpanProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.semiBold};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  &::before {
    content: "";
    width: 0.75rem; 
    height: 0.75rem; 
    background-color: ${({ color, theme }) => color || theme.colors.grayScale.gray900};
    border-radius: 4px; 
    margin-right: 0.5rem; 
    flex-shrink: 0; 
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

type StatusCardProps = {
  color: string;
};

export const StatusCard = styled.div<StatusCardProps>`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray500};

  h5 {
        font-size: ${({ theme }) => theme.typography.heading.h6.size};
        font-weight: ${({ theme }) => theme.typography.heading.h6.bold};
        color: ${({ color, theme }) => color || theme.colors.grayScale.gray900};
    }
`;

export const StatusCardInfo = styled.div<StatusCardProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3.5rem;
    padding-top: 1rem;

    > div {
        display: flex;
        flex-direction: column;
        > h2 {
            font-size: ${({ theme }) => theme.typography.heading.h2.size};
            font-weight: ${({ theme }) => theme.typography.heading.h2.bold};
            color: ${({ color, theme }) => color || theme.colors.grayScale.gray900};
        }
    }

    > div:last-child {
        width: 100%;
        gap: 0.5rem;
    }
`

export const TimeResponse = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray500};

  > h6 {
    font-size: ${({ theme }) => theme.typography.heading.h6.size};
    font-weight: ${({ theme }) => theme.typography.heading.h6.bold};
    color: ${({ theme }) => theme.colors.primary.purple100};
  }

  gap: 1.5rem;

  > div {
    display: flex;
    align-items: center;

    > h2 {
        padding-left: 1rem;
        font-size: ${({ theme }) => theme.typography.heading.h2.size};
        font-weight: ${({ theme }) => theme.typography.heading.h2.bold};
        color: ${({ theme }) => theme.colors.primary.purple100};
    }

    > h4 {
        padding-left: 0.25rem;
        font-size: ${({ theme }) => theme.typography.heading.h4.size};
        font-weight: ${({ theme }) => theme.typography.heading.h4.semiBold};
        color: ${({ theme }) => theme.colors.primary.purple200};
    }
  }
`;

export const SkeletonBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;                        
`

export const SkeletonBoxContainerFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;                        
`

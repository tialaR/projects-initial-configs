import { defaultTheme } from '#styles/themes/default';
import styled, { css } from 'styled-components';

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
`

export const SpaceY32 = styled.div`
  height: 1.5rem;
`;

export const Section = styled.div`
  background-color: ${({ theme, color }) => color ? color : theme.colors.grayScale.white};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.t18.size};
  font-weight: ${({ theme }) => theme.typography.title.t18.bold};
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
  padding-top: 1.5rem;

  /* > div:nth-child(1),
  > div:nth-child(2),
  > div:nth-child(3) {
    background-color: aliceblue;
    padding-bottom: 1.5rem;
  } */

  > div:nth-child(2),
  > div:nth-child(3),
  > div:nth-child(5),
  > div:nth-child(6) {
    border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
    padding-left: 3rem;
  }
`;

export const InfoBox = styled.div`
  span {
    display: flex;
    font-size: ${({ theme }) => theme.typography.title.t14.size};
    font-weight: ${({ theme }) => theme.typography.title.t14.bold};
    color: ${({ theme }) => theme.colors.primary.purple200};
    margin-bottom: 0.25rem;
  }

  p {
    display: flex;
    font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
    font-weight: ${({ theme }) => theme.typography.paragraph.p14.regular};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
  }
`;

export type StatusBadgeProps = {
  status: "excellent" | "regular" | "bad" | "good" | "pendingActivation" | "scheduledShipping" | "canceled";
};

export const statusColors = {
  excellent: defaultTheme.colors.alert.positive100,
  good: defaultTheme.colors.alert.info100,
  regular: defaultTheme.colors.alert.warning100,
  bad: defaultTheme.colors.alert.negative100,
  pendingActivation: defaultTheme.colors.alert.warning100,
  scheduledShipping: defaultTheme.colors.alert.positive100,
  canceled: defaultTheme.colors.alert.negative100,
};

export const StatusBadge = styled.span<StatusBadgeProps>`
  ${({ status, theme }) =>
    css`
      display: inline-block;
      padding: 0.188rem 0.5rem;
      border-radius: 4px;
      background-color: ${statusColors[status]};
      color: ${theme.colors.grayScale.black};
      font-size: ${theme.typography.title.t14.size};
      font-weight: ${theme.typography.title.t14.semiBold};
      text-align: center;
  `}
`;

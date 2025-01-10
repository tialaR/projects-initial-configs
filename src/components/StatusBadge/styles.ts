import { defaultTheme } from '#styles/themes/default';
import styled, { css } from 'styled-components';
import { StatusBadgeProps } from '.';

export const statusColors = {
  excellent: defaultTheme.colors.alert.positive100,
  good: defaultTheme.colors.alert.info100,
  regular: defaultTheme.colors.alert.warning100,
  bad: defaultTheme.colors.alert.negative100,
  pendingActivation: defaultTheme.colors.alert.warning100,
  scheduledShipping: defaultTheme.colors.alert.positive100,
  canceled: defaultTheme.colors.alert.negative100,
  cancel: defaultTheme.colors.alert.negative100,
  active: defaultTheme.colors.alert.positive100,
  conclued: defaultTheme.colors.alert.info100,
};

export const Badge = styled.span<StatusBadgeProps>`
  ${({ status, theme }) => css`
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
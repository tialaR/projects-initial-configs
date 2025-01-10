import styled, { css } from "styled-components";
import { findLabelColor, StatusBadgeProps } from ".";

export const Badge = styled.span<StatusBadgeProps>`
  ${({ label, theme }) => css`
    display: inline-block;
    padding: 0.188rem 0.5rem;
    border-radius: 4px;
    background-color: ${findLabelColor(label)};
    color: ${theme.colors.grayScale.black};
    font-size: ${theme.typography.title.t14.size};
    font-weight: ${theme.typography.title.t14.semiBold};
    text-align: center;
  `};
`;
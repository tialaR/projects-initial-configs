import styled, { css } from "styled-components";

export const Menu = styled.ul`
  list-style: none;

  > li + li {
    margin-top: 0.5rem;
  }
`;

type MenuItemProps = {
  isActive: boolean;
  isExpanded: boolean;
  disable?: boolean;
}

export const MenuItem = styled.li<MenuItemProps>`
  display: flex;
  align-items: center;
  border-radius: ${({ isExpanded }) => (isExpanded ? '32px' : '0')};
  justify-content: ${({ isExpanded }) => (isExpanded ? 'flex-start' : 'center')};
  padding: 0.75rem 1rem;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary.purple300 : 'transparent')};
  color: ${({ theme }) => theme.colors.grayScale.white};
  transition: background-color 0.3s, color 0.3s;

  ${({ disable, theme }) =>
    disable
      ? css`
          pointer-events: none;
          user-select: none;
          opacity: 0.2;
          cursor: not-allowed;

          &:hover {
            background-color: transparent;
          }
        `
      : css`
          pointer-events: auto;
          user-select: auto;
          opacity: 1;
          cursor: pointer;

          &:hover {
            background-color: ${theme.colors.primary.purple300};
          }
        `}
`;

export type IconProps = {
  isExpanded: boolean;
};

export const Icon = styled.span<IconProps>`
  margin-right: ${({ isExpanded }) => (isExpanded ? "0.625rem" : "0")};
  font-size: 1.2rem;
`;

export const Label = styled.span<IconProps>`
  display: ${({ isExpanded }) => (isExpanded ? "inline" : "none")};
  font-size: 1rem;
`;
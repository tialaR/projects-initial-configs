import styled, { css } from "styled-components";

type DrawerHeaderProps = {
  isExpanded: boolean;
}

export const DrawerHeader = styled.header<DrawerHeaderProps>`
    display: flex;

  ${({ isExpanded }) =>
    !isExpanded &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

export const Logo = styled.div<DrawerHeaderProps>`
  padding-top: 2.5rem;
  > img {
    width: ${({ isExpanded }) => (isExpanded ? "12.028rem" : "2.813rem")};
    height: auto;
  }
`;

export const ToggleButton = styled.button<DrawerHeaderProps>`
  position: fixed; 
  top: ${(props) => (props.isExpanded ? "2rem" : "3rem")};
  left: ${(props) => (props.isExpanded ? "18.2rem" : "6.7rem")};
  width: 2.5rem;
  height: 2.5rem;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  border: none;
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  z-index: 100; 
  transition: background-color 0.3s, left 0.3s;

  > div {
    > svg {
      margin-left: 0.125rem;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray200};
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      transform: rotate(180deg);
    `}
`;
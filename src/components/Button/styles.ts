import styled, { css } from "styled-components";
import { ButtonProps } from ".";

export const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:not(:disabled):hover { 
      opacity: 0.5;
  }
  &:disabled {
      cursor: not-allowed;
  }
  
  ${(props) =>
    props.variant === "primary" &&
    css`
        padding: 0.625rem 1.5rem;
        font-size: ${({ theme }) => theme.typography.button.b14.size};
        font-weight: ${({ theme }) => theme.typography.button.b14.bold};
        background-color: ${({ theme }) => theme.colors.primary.purple200};
        color: ${({ theme }) => theme.colors.grayScale.white};
        border-radius: 9999px;
        &:disabled {
            background-color: ${({ theme }) => theme.colors.grayScale.gray400};
            color: ${({ theme }) => theme.colors.grayScale.gray500};
        }
    `}

    ${(props) =>
    props.variant === "primary-outline" &&
    css`
        padding: 0.625rem 1.5rem;
        font-size: ${({ theme }) => theme.typography.button.b14.size};
        font-weight: ${({ theme }) => theme.typography.button.b14.bold};
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary.purple200};
        border: 2px solid ${({ theme }) => theme.colors.primary.purple200};
        border-radius: 9999px;
        &:disabled {
            border: 2px solid ${({ theme }) => theme.colors.grayScale.gray400};
            color: ${({ theme }) => theme.colors.grayScale.gray500};
        }
    `}
  
  ${(props) =>
    props.variant === "outline" &&
    css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary.purple200};
      font-size: ${({ theme }) => theme.typography.button.b14.size};
      font-weight: ${({ theme }) => theme.typography.button.b14.bold};
      &:disabled {
        color: ${({ theme }) => theme.colors.grayScale.gray400};
      }
    `}
`;

interface IconProps {
  iconPosition?: "left" | "right";
  disabled?: boolean;
}

export const Icon = styled.div<IconProps>`
  display: flex;
  align-items: center;

  ${({ iconPosition }) =>
    iconPosition === "left"
      ? css`
          margin-right: 0.5rem;
        `
      : iconPosition === "right"
        ? css`
          margin-left: 0.5rem;
        `
        : ""}
    
    ${({ disabled }) => {
    if (disabled) {
      return css`
          opacity: 0.2;
        `;
    }
  }}
`;
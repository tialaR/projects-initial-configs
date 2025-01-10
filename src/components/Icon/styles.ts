import styled from "styled-components";

type StyledIconProps = {
  size?: number;
  color?: string;
}

export const StyledIcon = styled.div<StyledIconProps>`
  display: inline-flex;
  width: ${({ size }) => size ? size : '2rem'}px;
  height: ${({ size }) => size ? size : '2rem'}px;
  color: ${({ theme, color }) => color ? color : theme.colors.grayScale.gray300};

  &:hover {
    color: ${({ theme }) => theme.colors.grayScale.gray200};
    transform: scale(1.1);
    transition: 0.3s ease-in-out;
  }
`;
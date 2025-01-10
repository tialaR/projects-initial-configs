import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.bold};
  color: ${({ theme }) => theme.colors.primary.purple200};
  margin-bottom: 0.5rem;
`;

type InputWrapperProps = {
  width?: string | number;
  isOpen: boolean;
};

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  border: ${({ theme, isOpen }) =>
    `2px solid ${isOpen ? theme.colors.primary.purple100 : theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  width: ${({ width }) => width || '100%'};
  height: 3.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: border-color 0.3s ease;
  background: ${({ theme }) => theme.colors.grayScale.white};
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none !important;
  outline: none !important;
  text-align: left;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  &::placeholder {
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
  }

  caret-color: ${({ theme }) => theme.colors.primary.purple100};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

type IconWrapperProps = {
  isOpen: boolean;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  z-index: 100;
  min-width: 18.75rem;
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.25rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.purple100};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: ${({ theme }) => theme.colors.primary.purple100};
  }
`;

export const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1.25rem;
  margin-right: 0.75rem;
`;

export const Select = styled.select`
  font-size: ${({ theme }) => theme.typography.paragraph.p12.size};
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  font-weight: ${({ theme }) => theme.typography.paragraph.p12.semiBold};
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.colors.grayScale.white};
  appearance: none;
  position: relative;
  width: 100%;
  padding-right: 1.5rem;

  option {
    text-align: center;
    padding: 0.5rem;
    background: ${({ theme }) => theme.colors.grayScale.white};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
    font-size: ${({ theme }) => theme.typography.paragraph.p12.size};
  }
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: 0; 
  pointer-events: none; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;


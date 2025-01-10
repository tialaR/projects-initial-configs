import styled, { css } from 'styled-components';

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.bold};
  color: ${({ theme }) => theme.colors.primary.purple200};
  margin-bottom: 0.5rem;
`;

export const TimePickerWrapper = styled.div`
  position: relative;
  width: 100%;
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

export const TimePickerInput = styled.input`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  cursor: pointer;
  
  font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  &::placeholder {
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
  }

  border: none !important;
  outline: none !important;
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

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.25rem;
  background: ${({ theme }) => theme.colors.grayScale.white};
  border: 2px solid ${({ theme }) => theme.colors.primary.purple100};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const TimeColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeColumnContainer = styled.div`
    span {
        display: flex;
        font-size: ${({ theme }) => theme.typography.title.t14.size};
        font-weight: ${({ theme }) => theme.typography.title.t14.semiBold};
        color: ${({ theme }) => theme.colors.grayScale.gray900};
        margin-top: 0.5rem;
    }
`;

type TimeColumnProps = {
  isFocused: boolean;
};

export const TimeColumn = styled.div<TimeColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 1.25rem;
  padding-bottom: 1.25rem;

  background-color: ${({ theme }) => theme.colors.grayScale.gray200};
  border-radius: 8px;
  border: 2px solid ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary.purple100 : theme.colors.grayScale.gray200};
    
  input {
    width: 100%;
    text-align: center;
    border: none;
    background-color: transparent;
    caret-color: ${({ theme }) => theme.colors.primary.purple100};
    color: ${({ theme }) => theme.colors.grayScale.black};
    font-size: ${({ theme }) => theme.typography.heading.h1.size};
    font-weight: ${({ theme }) => theme.typography.heading.h1.semiBold};

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const Separator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 2rem;
    font-size: ${({ theme }) => theme.typography.heading.h1.size};
    font-weight: ${({ theme }) => theme.typography.heading.h1.semiBold};
    color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const ConfirmButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 3rem;
  gap: 2rem;
`;
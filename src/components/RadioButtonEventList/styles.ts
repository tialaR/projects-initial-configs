import styled, { css } from "styled-components";

type RadioChecked = {
  checked?: boolean;
}

export const RadioListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  label + label {
    margin-top: 1.5rem;
  }
`;

export const RadioItem = styled.label<RadioChecked>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: ${({ theme, checked }) => checked ? `2px solid ${theme.colors.primary.purple200}`
    : `2px solid ${theme.colors.grayScale.gray300}`};
  border-radius: 8px;
  cursor: pointer;

  background-color: ${({ theme, checked }) => checked ? theme.colors.primary.purple200 : "transparent"};
`;

type RadioInputProps = {
  checked?: boolean;
}

export const RadioInput = styled.input<RadioInputProps>`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.purple200};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    css`
      border-color: ${({ theme }) => theme.colors.grayScale.white};
      background-color: transparent;

      &::after {
        content: "";
        width: 0.75rem;
        height: 0.75rem;
        background-color: ${({ theme }) => theme.colors.grayScale.white};
        border-radius: 50%;
        display: block;
      }
    `}
`;

export const RadioText = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span<RadioChecked>`
  font-size: ${({ theme }) => theme.typography.title.t16.size};
  font-weight: ${({ theme }) => theme.typography.title.t16.bold};
  color: ${({ theme, checked }) => checked ? theme.colors.grayScale.white : theme.colors.grayScale.gray800};
`;

export const Details = styled.span<RadioChecked>`
  font-size: ${({ theme }) => theme.typography.paragraph.p12.size};
  color: ${({ theme, checked }) => checked ? theme.colors.grayScale.white : theme.colors.grayScale.gray800};
`;
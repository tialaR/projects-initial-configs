import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  > span {
      margin-left: 0.5rem; 
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
`;

export const StyledCheckbox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 2px;
  margin-right: 0.5em;
  border: 2px solid ${({ theme }) => theme.colors.primary.purple100};
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.purple200};
    border: 2px solid ${({ theme }) => theme.colors.primary.purple200};
  }

  &.checked::before {
    content: "✔";
    font-size: 0.625rem;
    color: ${({ theme }) => theme.colors.grayScale.white};
    position: absolute;
    right: 0.188rem;
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.grayScale.gray300};
    background-color: ${({ theme }) => theme.colors.grayScale.gray300};
  }

  &:disabled + span {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
  }
`;

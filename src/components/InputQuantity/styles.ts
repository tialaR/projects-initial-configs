import styled from "styled-components";

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.bold};
  color: ${({ theme }) => theme.colors.primary.purple200};
  margin-bottom: 0.5rem;
`;

type InputWrapperProps = {
  width?: string | number;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `2px solid ${theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  width: ${({ width }) => width || '100%'};
  height: 3.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.purple100};
  }
`;

export const Input = styled.input`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  &::placeholder {
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
  }

  border: none !important;
  outline: none !important;
  
  caret-color: ${({ theme }) => theme.colors.primary.purple100};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

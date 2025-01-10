// import styled from "styled-components";

// export const TextAreaWrapper = styled.div<{ width?: string | number }>`
//     display: flex;
//     flex-direction: column;
//     width: ${({ width }) => (width ? width : '100%')};
// `;

// export const Label = styled.label`
//     font-size: 14px;
//     margin-bottom: 4px;
//     color: #333;
// `;

// export const TextAreaStyled = styled.textarea`
//     width: 100%;
//     min-height: 150px;
//     resize: none;
//     padding: 8px;
//     font-size: 16px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     outline: none;

//     &:focus {
//         border-color: #007bff;
//     }
// `;

import styled from "styled-components";

type TextAreaWrapperProps = {
  width?: string | number;
}

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.bold};
  color: ${({ theme }) => theme.colors.primary.purple200};
  margin-bottom: 0.5rem;
`;

export const TextAreaWrapper = styled.div<TextAreaWrapperProps>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: ${({ theme }) => `2px solid ${theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  position: relative;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.purple100};
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  min-height: 9.375rem;

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

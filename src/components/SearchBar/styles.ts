import styled from "styled-components";

type SearchWrapperProps = {
  width?: string | number;
}

export const SearchWrapper = styled.div<SearchWrapperProps>`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `2px solid ${theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  padding: 1rem;
  width: ${({ width }) => width || '100%'};
  min-width: 18rem;
  position: relative;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.purple100};
  }
`;

export const SearchInput = styled.input`
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

export const SearchIconButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.purple100};
  background: none;
  border: none;
`;
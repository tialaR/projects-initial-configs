import styled from 'styled-components';

export const CustomFileInputWrapper = styled.label`
  position: relative;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray500};
  border-radius: 8px;
  padding: 1rem;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

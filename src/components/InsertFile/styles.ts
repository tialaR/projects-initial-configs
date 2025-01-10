import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: transparent;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const FileInputWrapper = styled.div<{ isDragOver?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.colors.primary.purple100};
  border-radius: 8px;
  padding: 2rem 3rem 3rem 3rem;
  text-align: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  ${(props) =>
    props.isDragOver &&
    css`
      opacity: 0.3;
    `}

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;

    p {
      display: flex;
      font-size: ${({ theme }) => theme.typography.title.t18.size};
      font-weight: ${({ theme }) => theme.typography.title.t18.semiBold};
      color: ${({ theme }) => theme.colors.grayScale.gray900};
    }
  }
`;

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

  span {
    flex: 1;
    text-align: left;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.grayScale.gray800};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary.purple100};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

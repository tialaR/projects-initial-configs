import styled from 'styled-components';

export const Container = styled.div`
  background-color: transparent;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.colors.primary.purple100};
  border-radius: 8px;
  padding: 2rem 2rem 3rem 2rem;
  text-align: center;
  margin-bottom: 1.5rem;

  p {
    display: flex;
    font-size: ${({ theme }) => theme.typography.title.t18.size};
    font-size: ${({ theme }) => theme.typography.title.t18.semiBold};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
    margin-bottom: 1rem;
  }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
`;
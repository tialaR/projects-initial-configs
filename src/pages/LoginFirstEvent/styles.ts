import styled from "styled-components";

export const Header = styled.div`
    margin-bottom: 2.5rem;
`

export const ListEventsWrapper = styled.div`
  background-color: ${({ theme, color }) => color ? color : theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const ListEventsHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 2rem;
    margin-bottom: 1.5rem;  
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
`;

export const ListEventsTitle = styled.span`
    font-size: ${({ theme }) => theme.typography.title.t18.size};
    font-weight: ${({ theme }) => theme.typography.title.t18.bold};
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const ListEventsDescription = styled.span`
    font-size: ${({ theme }) => theme.typography.title.t16.size};
    font-weight: ${({ theme }) => theme.typography.title.t14.regular};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
`
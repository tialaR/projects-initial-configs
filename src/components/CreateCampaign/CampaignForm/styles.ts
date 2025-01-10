import styled from "styled-components";

export const FormContainer = styled.form`
`;

export const FormWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 2rem;
    margin-bottom: 1.5rem;  
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
`;

export const FormTitle = styled.span`
    font-size: ${({ theme }) => theme.typography.title.t18.size};
    font-weight: ${({ theme }) => theme.typography.title.t18.bold};
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const FormDescription = styled.span`
    font-size: ${({ theme }) => theme.typography.title.t16.size};
    font-weight: ${({ theme }) => theme.typography.title.t14.regular};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
`;

export const FormLineWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    margin-bottom: 1.5rem;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(50% - 16px);
  min-width: 300px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
`
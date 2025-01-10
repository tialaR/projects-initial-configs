import styled from 'styled-components';

export const ErrorMessage = styled.span`
    color: ${({ theme }) => theme.colors.alert.negative200};
    font-size: ${({ theme }) => theme.typography.paragraph.p14};
    margin-top: 4px;
    display: block;
`;
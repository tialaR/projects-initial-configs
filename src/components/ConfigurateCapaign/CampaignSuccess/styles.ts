import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
`;

export const TitleContainer = styled.header`
    padding-bottom: 3rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};

    h5 {
        font-size: ${({ theme }) => theme.typography.heading.h5.size};
        font-weight: ${({ theme }) => theme.typography.heading.h5.bold};
        color: ${({ theme }) => theme.colors.grayScale.gray900};
        margin-top: 0.5rem;
    }
`;

export const Footer = styled.footer`
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1.5rem;

    span {
        font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
        font-weight: ${({ theme }) => theme.typography.paragraph.p16.semiBold};
        color: ${({ theme }) => theme.colors.grayScale.gray800};
    }

    div {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
`;
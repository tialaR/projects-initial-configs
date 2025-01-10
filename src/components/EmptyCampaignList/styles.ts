import styled from 'styled-components';

export const EmptyWrapper = styled.div`
    flex: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    border-radius: 8px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 20.938rem;

    img {
        width: 10.875rem;
        height: 10.875rem;
        margin-bottom: 1rem;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.6rem;

    h4 {
         font-size: ${({ theme }) => theme.typography.heading.h4.size};
        font-weight: ${({ theme }) => theme.typography.heading.h4.semiBold};
        color: ${({ theme }) => theme.colors.primary.purple300};
        text-align: center;
        margin-bottom: 1rem;
    }

    p {
        font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
        font-weight: ${({ theme }) => theme.typography.paragraph.p16.regular};
        color: ${({ theme }) => theme.colors.grayScale.gray900};
        text-align: center;
    }
`


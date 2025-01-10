import styled from "styled-components";

export const ListEventsHeaderContainer = styled.div`
    margin-top: 2rem;
    margin-bottom: 3.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    input {
        width: 300px;
        border: 2px solid ${({ theme }) => theme.colors.grayScale.gray400};
    }
`

export const ListEventsName = styled.span`
    font-size: ${({ theme }) => theme.typography.title.t18.size};
    font-weight: ${({ theme }) => theme.typography.title.t18.bold};
    color: ${({ theme }) => theme.colors.grayScale.black};
`

export const ListEventsContainer = styled.div`
`;
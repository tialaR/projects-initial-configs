import styled from 'styled-components';

type HeaderContainerProps = {
    isExpanded: boolean;
    hasEventName: boolean | null;
}
export const HeaderContainer = styled.div`
    height: 6rem;
    width: 100vw;
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const HeaderContainerContent = styled.div<HeaderContainerProps>`
    width: ${({ isExpanded }) => (isExpanded ? 'calc(100vw - 19.5rem)' : 'calc(100vw - 7.813rem)')};
    display: flex;
    justify-content: ${({ hasEventName }) => (hasEventName ? 'space-between' : 'flex-end')};
    align-items: center;
    margin-left: auto;
    padding-left: 3rem;
    padding-right: 3.5rem;
`;

export const EventContaiver = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    outline: none;
    box-shadow: none;
    cursor: pointer;

    div {
        p {
            display: flex;
            font-size: ${(props) => props.theme.typography.paragraph.p14.size};
            font-weight: ${(props) => props.theme.typography.paragraph.p14.semiBold};
            color: ${(props) => props.theme.colors.grayScale.gray700};
        }
    }
`;

export const EventSelectedContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    h4 {
        font-size: ${(props) => props.theme.typography.heading.h4.size};
        font-weight: ${(props) => props.theme.typography.heading.h4.bold};
        color: ${(props) => props.theme.colors.primary.purple200};
    }

    svg {
        margin-left: 0.5rem;
    }
`;

export const UserProfileWrapper = styled.div`
    align-self: flex-end;
`;

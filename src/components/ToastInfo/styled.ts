import styled from "styled-components";

type ToastWrapperProps = {
    visible: boolean;
};

type ToastInfoContainerProps = {
    type: "success" | "error";
};

export const ToastWrapper = styled.div<ToastWrapperProps>`
    position: fixed;
    top: 6.8rem;
    right: 3rem;
    display: flex;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    transform: ${({ visible }) => (visible ? "translateX(0)" : "translateX(100%)")};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

export const ToastInfoContainer = styled.div<ToastInfoContainerProps>`
    border-width: 1px;
    border-style: solid;
    border-color: ${({ type, theme }) => (
        type === "success"
            ? theme.colors.alert.positive100
            : theme.colors.alert.negative100
    )};
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ToastInfoContent = styled.div`
    display: flex;
    flex-direction: column;

    p {
        margin: 0;
        font-size: ${({ theme }) => theme.typography.title.t16.size};
        font-weight: ${({ theme }) => theme.typography.title.t16.bold};
        color: ${({ theme }) => theme.colors.grayScale.gray900};
    }

    small {
        font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
        font-weight: ${({ theme }) => theme.typography.paragraph.p14.semiBold};
        color: ${({ theme }) => theme.colors.grayScale.gray800};
    }
`;

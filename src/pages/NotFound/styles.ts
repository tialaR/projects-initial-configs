import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: transparent;
`;

export const Content = styled.div`
    text-align: center;
    padding: 2.5rem;
    border-radius: 12px;
    max-width: 31.25rem;
`;

export const Title = styled.h1`
    font-size: 4.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.paragraph.p14.bold};
    margin: 0;
`;

export const Subtitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary.purple200};
    margin: 1rem 0;
`;

export const Description = styled.p`
    font-size: ${({ theme }) => theme.typography.paragraph.p16.regular};
    color: ${({ theme }) => theme.colors.primary.purple300};
    margin-bottom: 1.5rem;
`;

export const HomeButton = styled(Link)`
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary.purple200};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.paragraph.p14.semiBold};
    border-radius: 8px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;

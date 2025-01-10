import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  align-items: center;
`;

export const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "/";
    margin: 0 0.5rem;;
    color: ${({ theme }) => theme.colors.grayScale.gray700};
  }
`;

type BreadcrumbLinkProps = {
    isLast?: boolean;
};

export const BreadcrumbLink = styled.a<BreadcrumbLinkProps>`
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.paragraph.p12.size};
  color: ${({ isLast, theme }) =>
        (isLast ? theme.colors.grayScale.gray800 : theme.colors.grayScale.gray700)};
  font-weight: ${({ isLast, theme }) =>
        (isLast ? theme.typography.paragraph.p12.semiBold : theme.typography.paragraph.p12.regular)};

    cursor: ${({ isLast }) => (isLast ? "default" : "pointer")};

    ${({ isLast }) =>
        isLast &&
        `
        pointer-events: none;
    `}

    &:hover {
        opacity: ${({ isLast }) => (isLast ? 1 : 0.9)};
    }
`;

import styled from 'styled-components';

export const MainTitleStyled = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.heading.h1};
  font-weight: ${({ theme }) => theme.typography.heading.h1.bold};
  font-size: ${({ theme }) => theme.typography.heading.h1.size};
  color: ${({ theme }) => theme.colors.primary.purple300};
`;

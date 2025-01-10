import styled from "styled-components";

export const Container = styled.div`
    padding-left: 3rem;
    padding-right: 3rem;
    height: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.heading.h5.size};
  font-weight: ${({ theme }) => theme.typography.heading.h5.bold};
  color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

export const SubTitle = styled.p`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 3.5rem;
  font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
  font-weight: ${({ theme }) => theme.typography.paragraph.p14.semiBold};
  color: ${({ theme }) => theme.colors.grayScale.gray800};
`;

export const DividerX = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.grayScale.gray300};
`;

export const IllustratedInfo = styled.main`
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; 
  max-width: 50%; 
  min-width: 12.5rem;

  p {
    all: unset;
    display: block;
    font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
  }

  h5 {
    all: unset;
    display: block;
    font-size: ${({ theme }) => theme.typography.heading.h5.size};
    font-weight: ${({ theme }) => theme.typography.heading.h5.bold};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
  }
`;

export const DividerY = styled.div`
  width: 2px;
  height: 6.125rem;
  background: ${({ theme }) => theme.colors.grayScale.gray300};
`;

export const ContactCardsContainer = styled.footer`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
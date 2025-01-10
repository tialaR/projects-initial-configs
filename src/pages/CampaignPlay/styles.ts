import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
`

export const SpaceY32 = styled.div`
  height: 1.5rem;
`;

export const Section = styled.div`
  background-color: ${({ theme, color }) => color ? color : theme.colors.grayScale.white};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.t18.size};
  font-weight: ${({ theme }) => theme.typography.title.t18.bold};
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};

  > div:nth-child(2),
  > div:nth-child(3),
  > div:nth-child(4) {
    border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
    padding-left: 3rem;
  }
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: center; 
    width: 100%; 

    span {
        display: block; 
        font-size: ${({ theme }) => theme.typography.title.t14.size};
        font-weight: ${({ theme }) => theme.typography.title.t14.bold};
        color: ${({ theme }) => theme.colors.primary.purple200};
        margin-bottom: 0.25rem;
    }

    p {
        display: block; 
        font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
        font-weight: ${({ theme }) => theme.typography.paragraph.p14.regular};
        color: ${({ theme }) => theme.colors.grayScale.gray900};
    }
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: ${({ theme }) => theme.typography.paragraph.p14.size};
    font-weight: ${({ theme }) => theme.typography.paragraph.p14.regular};
    color: ${({ theme }) => theme.colors.grayScale.black};
  }
`;


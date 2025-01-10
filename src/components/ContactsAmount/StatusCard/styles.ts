import styled from 'styled-components';

type ContactCardContainerProps = {
    color: string;
};

export const ContactCardContainer = styled.div<ContactCardContainerProps> `
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ color }) => color};
  border-radius: 16px;
  padding: 1.5rem;
`;

export const ContactCard = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
`;

export const ContactInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  align-items: flex-end;
  justify-content: space-between;
`;

type ContactInfoLabelsContainerProps = {
    color: string;
};

export const ContactInfoLabelsContainer = styled.div<ContactInfoLabelsContainerProps>`
      display: flex;
      flex-direction: column;

      p {
          all: unset;
          display: block;
          font-size: ${({ theme }) => theme.typography.title.t14.size};
          font-weight: ${({ theme }) => theme.typography.title.t14.semiBold};
          color: ${({ theme }) => theme.colors.grayScale.gray700};
        }

        h2 {
          all: unset; 
          display: block; 
          font-size: ${({ theme }) => theme.typography.heading.h2.size};
          font-weight: ${({ theme }) => theme.typography.heading.h2.bold};
          color: ${({ color }) => color};
        }
`;

export const ContactInfoValuesContainer = styled.div`
    h2 {
          all: unset;
          display: block;
          font-size: ${({ theme }) => theme.typography.heading.h2.size};
          font-weight: ${({ theme }) => theme.typography.heading.h2.bold};
          color: ${({ theme }) => theme.colors.grayScale.gray800};
        }
`;

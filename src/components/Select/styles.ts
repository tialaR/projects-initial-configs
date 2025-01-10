import styled, { css } from 'styled-components';

export const SelectWrapper = styled.div<{ width?: string | number }>`
    position: relative;
    display: inline-block;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    min-width: 8rem;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.bold};
  color: ${({ theme }) => theme.colors.primary.purple200};
  margin-bottom: 0.5rem;
`;

type SelectButtonProps = {
  placeholder: boolean;
  width?: string | number;
};

export const SelectButton = styled.button<SelectButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: 3.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: ${({ theme }) => `2px solid ${theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  transition: border-color 0.3s ease;
  background-color: ${({ theme }) => theme.colors.grayScale.white};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.purple100};
  }

  > span {
    display: flex;
    flex: 1;
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    color: ${({ theme }) => theme.colors.grayScale.gray800};

    ${({ placeholder, theme }) =>
    placeholder &&
    css`
      font-size: ${theme.typography.paragraph.p16.size};
      color: ${theme.colors.grayScale.gray800};
    `}
  }
`;

type IconWrapperProps = {
  isOpen: boolean;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

export const OptionsList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.grayScale.white};
    border: 2px solid ${({ theme }) => theme.colors.primary.purple100};
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-top: 0.25rem;
    max-height: 16.75rem;
    overflow-y: auto;
    list-style: none;

    padding-top: 1rem;
    padding-bottom: 2rem;
    padding-left: 0.5rem;
    padding-right: 1rem;

    &::-webkit-scrollbar {
        width: 0.65rem; 
        height: 0.2rem; 
        background: transparent; 
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.grayScale.gray500};
        border-radius: 8px;
        &:hover {
          background: ${({ theme }) => theme.colors.grayScale.gray500};
          opacity: 0.9;
        }
        &:active {
          background: ${({ theme }) => theme.colors.grayScale.gray600};
        }
    }
`;

export const OptionItem = styled.li`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    opacity: 1;
    transition: background-color 0.2s;
    overflow: hidden; 
    padding: 1rem;

    &:hover {
        opacity: 0.9;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.colors.grayScale.gray200};
    }
`;

export const OptionDetailsSelected = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  padding-right: 0.4rem;
  padding-left: 0.5rem;

  > div {
      display: flex;
      flex: 1;
      align-items: center;

      > span {
        display: inline-block;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 0.5rem;
        color: ${({ theme }) => theme.colors.grayScale.gray800};
      }

      > span:first-child {
          font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
          font-weight: ${({ theme }) => theme.typography.paragraph.p16.semiBold};
      }

      > span:last-child {
          font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
          font-weight: ${({ theme }) => theme.typography.paragraph.p16.regular};
      }
  }
`;

export const OptionDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const TemplateLabel = styled.span`
    display: flex;
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    font-weight: ${({ theme }) => theme.typography.paragraph.p16.semiBold};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

export const TemplateValue = styled.span`
    display: flex;
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    font-weight: ${({ theme }) => theme.typography.paragraph.p16.regular};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

// PHONE CATEGORY (select)
export const CategoryContainer = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden; 
    background-color: ${({ theme }) => theme.colors.grayScale.white};

    > div {
        display: flex;
        flex-direction: column;
    }
`;

export const CategoryLabel = styled.span`
  display: flex;
  font-size: ${({ theme }) => theme.typography.title.t14.size};
  font-weight: ${({ theme }) => theme.typography.title.t14.semiBold};
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray500};
`;

export const PhonesList = styled.ul`
  display: flex;
  flex-direction: column;

  > li {
      padding-top: 0.5rem;
      padding-bottom: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
  }
`;

export const PhoneItem = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  opacity: 1;
  transition: background-color 0.2s;
  overflow: hidden; 

  background-color: ${({ theme }) => theme.colors.grayScale.white};

  &:hover {
    opacity: 0.9;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.grayScale.gray200};
  }
`;

export const PhoneDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PhoneName = styled.span`
    display: flex;
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    font-weight: ${({ theme }) => theme.typography.paragraph.p16.semiBold};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

export const PhoneNumber = styled.span`
    display: flex;
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    font-weight: ${({ theme }) => theme.typography.paragraph.p16.regular};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
`;


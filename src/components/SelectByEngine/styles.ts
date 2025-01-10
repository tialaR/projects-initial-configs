import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative; 
  display: inline-block; 
`;

export const SelectButton = styled.button`
  width: 14rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: ${({ theme }) => `2px solid ${theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.grayScale.white};
  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  font-weight: ${({ theme }) => theme.typography.paragraph.p16.semiBold};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.purple100};
  }

  > span {
    display: flex;
    text-align: left;  
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
    margin-left: auto;
  
    ${({ isOpen }) =>
    isOpen &&
    css`
        transform: rotate(180deg);
      `}
  `;

export const Modal = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem); 
  left: 50%; 
  transform: translateX(-50%); 
  
  background: ${({ theme }) => theme.colors.grayScale.white};
  border-radius: 8px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.purple100};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
  width: 13rem;
`;


export const OptionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    opacity: 1;
    transition: background-color 0.2s;
    overflow: hidden; 
    padding: 1rem;

    > span {
      display: inline-block;
      font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
      font-weight: ${({ theme }) => theme.typography.paragraph.p16.semiBold};
      color: ${({ theme }) => theme.colors.grayScale.gray800};
    }

    &:hover {
        opacity: 0.9;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.colors.grayScale.gray200};
    }
`;
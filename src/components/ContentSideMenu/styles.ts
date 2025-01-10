import styled from 'styled-components';

type ContentSideMenuProps = {
  isOpen: boolean;
};

export const Backdrop = styled.div<ContentSideMenuProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
`;

export const MenuContainer = styled.div<ContentSideMenuProps>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? '0' : '-40%')};
  width: 40%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  
  svg {
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const ContentMenuContainer = styled.div`
  padding-top: 4rem;
  height: 100%;
`;

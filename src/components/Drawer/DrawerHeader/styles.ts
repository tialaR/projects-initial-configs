import styled from "styled-components";

type DrawerHeaderProps = {
  isExpanded: boolean;
}

export const DrawerHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1.75rem 1.25rem;
  justify-content: center;
`;

export const Logo = styled.div<DrawerHeaderProps>`
  font-size: ${(props) => (props.isExpanded ? "2.5rem" : "2rem")};
  text-align: center;
  font-weight: bold;
  transition: font-size 0.3s;
`;

export const ToggleButton = styled.button<DrawerHeaderProps>`
  position: fixed; 
  top: 2rem;
  left: ${(props) => (props.isExpanded ? "17.2rem" : "3.15rem")};
  width: 2.5rem;
  height: 2.5rem;
  transform: translateY(-50%);
  background-color: #fff;
  border: none;
  color: #616161;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  z-index: 100; /* Garantia de que estará sobre os outros elementos */
  transition: background-color 0.3s, left 0.3s; /* Suaviza a movimentação ao expandir/recolher */

  &:hover {
    background-color: #eeeeee;
  }
`;
import styled from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 8px;
`;

export const TooltipIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #3b5bfd; /* Azul do ícone */
`;

export const TooltipText = styled.div`
  visibility: hidden;
  width: 220px;
  background-color: #071629; /* Fundo escuro do tooltip */
  color: #ffffff;
  text-align: left;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  position: absolute;
  top: -5px;
  left: 25px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translateY(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: transparent #071629 transparent transparent;
  }
`;

export const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;

  &:hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InputQuantity = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;
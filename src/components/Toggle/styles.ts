import styled from "styled-components";

type ToggleWrapperProps = {
    isActive: boolean;
};

export const ToggleWrapper = styled.div<ToggleWrapperProps>`
  width: 50px;
  height: 24px;
  border-radius: 50px;
  background-color: ${(props) => (props.isActive ? "#4caf50" : "#ccc")};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isActive ? "flex-end" : "flex-start")};
  padding: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const ToggleSlider = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.3s ease;
`;

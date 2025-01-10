import styled from 'styled-components';

type OutletContainerProps = {
  isExpanded: boolean;
}

export const DefaultLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const DrawerAndOutletContainer = styled.div<OutletContainerProps>`
  display: flex;
  flex: 1;
  width: 100vw;
`;

export const OutletContainer = styled.div<OutletContainerProps>`
  flex: 1; 
  display: flex; 
  flex-direction: column;
  margin-left: ${(props) => (props.isExpanded ? "19.5rem" : "7.813rem")};
  padding-top: 1.5rem;;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 6rem;
  transition: margin-left 0.3s;
  background-color: ${(props) => props.theme.colors.grayScale.gray200};
  height: calc(100vh - 6rem); 
  overflow-y: auto; 
`;
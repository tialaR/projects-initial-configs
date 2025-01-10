import styled, { css } from "styled-components";

type DrawerContainerProps = {
  isExpanded: boolean;
}

export const DrawerContainer = styled.nav<DrawerContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${(props) => props.theme.colors.secondary.indigo300};
  color: ${(props) => props.theme.colors.grayScale.gray300};
  box-shadow: 0.125rem 0 0.3125rem rgba(0, 0, 0, 0.02);
  overflow: hidden;
  transition: width 0.3s;
  width: ${(props) => (props.isExpanded ? "19.5rem" : "7.813rem")};

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      padding: 1.5rem;
    `}

    ${({ isExpanded }) =>
    !isExpanded &&
    css`
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    `}
`;

export const SpaceY80 = styled.div`
  height: 5.063rem;
`

export const DrawerFooter = styled.footer<DrawerContainerProps>`
  position: absolute;
  bottom: 0;
  align-items: center;
  width: ${(props) => (props.isExpanded ? "85%" : "100%")};

  span {
    margin-left: 0.75rem;
  }

  display: flex;
  align-items: center;
  border-radius: ${(props) => (props.isExpanded ? '32px' : '0')};;
  justify-content: ${(props) => (props.isExpanded ? 'flex-start' : 'center')};
  padding: 0.75rem 1rem;
  margin-bottom: 3rem;
  cursor: pointer;
  color: ${(props) => (props.theme.colors.grayScale.gray300)};
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${(props) => (props.theme.colors.primary.purple300)};
  }
`;
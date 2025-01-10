import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.grayScale.gray200};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  body, input, textarea, button {
    font-family: ${({ theme }) => theme.typography.fontOpenSans};
    font-weight:  ${({ theme }) => theme.typography.paragraph.p16.regular};
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  }

  textarea, input, select {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
} 
`;

export default GlobalStyle;

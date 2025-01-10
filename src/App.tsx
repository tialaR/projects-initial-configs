import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { RouterConfig } from './routes';
import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterConfig />
    </ ThemeProvider>
  );
}

export default App;

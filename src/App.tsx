import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { RouterConfig } from './routes';
import GlobalStyle from './styles/globalStyle';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'sa-east-1_fC37mfq4i',
      userPoolClientId: '11prps37ehpibes594nejh64co',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "link",
      userAttributes: {
        email: {
          required: true,
        },
      },
    }
  }
});

function App() {
  return (
    <Authenticator hideSignUp={true}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <RouterConfig />
      </ThemeProvider>
    </Authenticator>
  );
}

export default App;

import theme from '../styles/theme';
import { Global, css } from '@emotion/core';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  useColorMode
} from '@chakra-ui/core';
import cookies from 'next-cookies';

import { AppProps } from 'next/app';

const GlobalStyles = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#171923'};
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({
  Component,
  pageProps,
  initialColorMode
}: AppProps & { initialColorMode: 'light' | 'dark' }): React.ReactNode => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value={initialColorMode}>
        <GlobalStyles>
          <Component {...pageProps} />
        </GlobalStyles>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { isDarkMode = 'false' } = cookies(ctx);
  return {
    pageProps,
    initialColorMode: isDarkMode === 'true' ? 'dark' : 'light'
  };
};

export default App;

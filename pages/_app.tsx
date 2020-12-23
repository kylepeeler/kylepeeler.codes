import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import '../styles/globals.css';

import theme from '../styles/theme';

// export const GlobalStyles = ({ children }: { children: React.ReactNode }) => {
//   const { colorMode } = useColorMode();

//   return (
//     <>
//       <CSSReset />
//       <Global
//         styles={css`
//           html {
//             min-width: 360px;
//             scroll-behavior: smooth;

//             /* Global Variables */
//             --theme-gradient: linear-gradient(
//               90deg,
//               #0af5f4 7.81%,
//               #adfe01 53.65%,
//               #ffd706 100%
//             );
//           }
//           #__next {
//             display: flex;
//             flex-direction: column;
//             min-height: 100vh;
//             background: ${colorMode === 'light' ? 'white' : '#171923'};
//           }
//         `}
//       />
//       {children}
//     </>
//   );
// };

const GlobalHeader = () => (
  <Head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="https://use.typekit.net/pnj0wsg.css"></link>
    <meta
      name="description"
      content="The personal blog & portfolio of Kyle Peeler"
    />
    <meta
      property="og:image"
      content={`https://og-image.now.sh/${encodeURI(
        'kylepeeler.codes'
      )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
    />
    <meta name="og:title" content={'kylepeeler.codes'} />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);

const App = ({ Component, pageProps }: AppProps): React.ReactNode => (
  <>
    <GlobalHeader />
    <ThemeProvider theme={theme}>
      {/* @FUTURE: how can we not always start at light?.. */}
      <ColorModeProvider value={'light'}>
        {/* <GlobalStyles> */}
        <Component {...pageProps} />
        {/* </GlobalStyles> */}
      </ColorModeProvider>
    </ThemeProvider>
  </>
);

export default App;

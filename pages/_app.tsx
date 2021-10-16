import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import MainLayout from '../layouts/MainLayout';
import '../styles/globals.css';

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
    <title>kylepeeler.codes</title>
    <meta name="og:title" content={'kylepeeler.codes'} />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);

const App = ({ Component, pageProps }: AppProps): React.ReactNode => (
  <>
    <GlobalHeader />
    <ThemeProvider attribute="class">
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  </>
);

export default App;

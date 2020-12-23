import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import GradientText from './GradientText';
import { DarkModeToggle } from './DarkModeToggle';

const HeaderLine = styled.div`
  position: sticky;
  z-index: 11;
  top: 0;
  background: var(--theme-gradient);
  width: 100%;
  height: 10px;
`;

// const StickyNav = styled.div`

// `;

const Container = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = /*useTheme(); */ useState('light');

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white dark:bg-black">
      <HeaderLine />
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
        {/* <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              )}
            </svg>
          )}
        </button> */}
        <NextLink href="/" passHref>
          <a>
            <GradientText className="text-2xl font-extrabold">
              kylepeeler.codes
            </GradientText>
          </a>
        </NextLink>
        <div className="flex items-center">
          {/* <NextLink href="/dashboard">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              Dashboard
            </a>
          </NextLink> */}
          <NextLink href="/about">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">About</a>
          </NextLink>
          <NextLink href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              Dashboard
            </a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Uses</a>
          </NextLink>
          <DarkModeToggle
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
          />
        </div>
      </nav>
      <main className="flex flex-col justify-center bg-white dark:bg-black px-8 container mx-auto max-w-4xl">
        {children}
        {/* <Footer /> */}
      </main>
    </div>
    // // const { colorMode, toggleColorMode } = useColorMode();

    // const bgColor = {
    //   light: 'white',
    //   dark: 'gray.900'
    // };
    // const primarytextColor = {
    //   light: 'black',
    //   dark: 'white'
    // };
    // const navBgColor = {
    //   light: 'rgba(255, 255, 255, 0.8)',
    //   dark: 'rgba(23, 25, 35, 0.8)'
    // };

    // return (
    //   <>
    //     <HeaderLine />
    //     <StickyNav
    //       className="max-width mb-8"
    //       // width="100%"
    //       // bg={navBgColor[colorMode]}
    //       // mb={8}
    //     >
    //       <div className="flex space-x-8 max-w-900 align-center space-between mx-auto">
    //         <NextLink href="/" passHref>
    //           <a>
    //             <GradientText className="text-lg font-extrabold">
    //               kylepeeler.codes
    //             </GradientText>
    //           </a>
    //         </NextLink>
    //         <nav className="flex align-items-center font-bold color-black full-width space-between">
    //           <TailwindButton label="wow such cool tailwindz" />
    //           <NextLink href="/" passHref>
    //             <a className="block font-semibold p-4">Home</a>
    //           </NextLink>
    //           <NextLink href="/blog" passHref>
    //             <a className="block font-semibold p-4">Blog</a>
    //           </NextLink>
    //           <NextLink href="/about" passHref>
    //             <a className="block font-semibold p-4">About</a>
    //           </NextLink>
    //           {/* <DarkModeToggle
    //           // checked={colorMode === 'dark'}
    //           // onChange={toggleColorMode}
    //           /> */}
    //         </nav>
    //       </div>
    //     </StickyNav>
    //     <div
    //       className="flex space-y-4 px-8"
    //       // bg={bgColor[colorMode]}
    //       // color={primarytextColor[colorMode]}
    //     >
    //       <main className="block space-y-8 mt-0 mx-auto mb-4 max-w-900">
    //         {children}
    //       </main>
    //       {/* <Footer /> */}
    //     </div>
    //   </>
  );
};

export default Container;

import React, { useState } from 'react';
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

const Container = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = /*useTheme(); */ useState('light');

  return (
    <div className="bg-white dark:bg-black">
      <HeaderLine />
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
        <NextLink href="/" passHref>
          <a>
            <GradientText className="text-2xl font-extrabold">
              kylepeeler.codes
            </GradientText>
          </a>
        </NextLink>
        <div className="flex items-center">
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
  );
};

export default Container;

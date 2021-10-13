import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import GradientLine from './gradients/GradientLine';
import GradientText from './gradients/GradientText';
import { DarkModeToggle } from './DarkModeToggle';

const Container = ({ children }: { children: React.ReactNode }) => {
  // Done to avoid a hydration mismatch because we cannot know the theme on the server
  // See https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="bg-white dark:bg-black">
      <GradientLine />
      <nav className="sticky-nav flex justify-between items-center w-full pt-8 px-0 mx-auto bg-white dark:bg-black bg-opacity-60 dark:text-white">
        <div className="flex w-full place-content-between items-center max-w-4xl mx-auto px-0 sm:px-8 sm:flex-row flex-col">
          <NextLink href="/" passHref>
            <a>
              <GradientText
                as="h1"
                className="text-2xl font-extrabold hover:text-filter-shadow-lg"
              >
                kylepeeler.codes
              </GradientText>
            </a>
          </NextLink>
          <div className="flex items-center my-4 sm:my-0 w-10/12 sm:w-auto justify-evenly">
            <NextLink href="/about">
              <a className="p-1 sm:p-4 text-gray-900 dark:text-white">About</a>
            </NextLink>
            <NextLink href="/blog">
              <a className="p-1 sm:p-4 text-gray-900 dark:text-white">Blog</a>
            </NextLink>
            {/* <NextLink href="/">
              <a className="p-1 sm:p-4 text-gray-900 dark:text-white-100">
                Dashboard
              </a>
            </NextLink> */}
            <NextLink href="/uses">
              <a className="p-1 sm:p-4 text-gray-900 dark:text-white">Uses</a>
            </NextLink>
            {isMounted && (
              <DarkModeToggle
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
            )}
          </div>
        </div>
      </nav>
      <main className="flex flex-col justify-center bg-white dark:bg-black dark:text-white p-8 container mx-auto max-w-4xl">
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default Container;

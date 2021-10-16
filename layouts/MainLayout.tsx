import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import GradientLine from '../components/gradients/GradientLine';
import GradientText from '../components/gradients/GradientText';
import { DarkModeToggle } from '../components/DarkModeToggle';
import Footer from '../components/Footer';

const NavItem = ({ name, href }) => {
  const { pathname } = useRouter();
  const isActive = pathname.includes(href);
  return (
    <NextLink href={href}>
      <a
        className={`${
          isActive ? 'text-bold' : ''
        } p-1 sm:p-2 sm:m-2 hover:ring-2 hover:ring-green-300 hover:bg-green-100 bg-opacity-75 rounded-md text-gray-900 dark:text-white dark:bg-opacity-10 dark:hover:bg-black`}
      >
        {name}
      </a>
    </NextLink>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // Done to avoid a hydration mismatch because we cannot know the theme on the server
  // See https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="bg-white dark:bg-black">
      <GradientLine />
      <nav className="sticky-nav flex justify-between items-center w-full pt-3 px-0 mx-auto bg-white dark:bg-black bg-opacity-60 dark:text-white">
        <div className="flex w-full place-content-between items-center max-w-4xl mx-auto mt-2 sm:mt-0 px-0 sm:px-8 sm:flex-row flex-col">
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
          <div className="flex items-center my-3 sm:my-0 w-10/12 sm:w-auto justify-evenly">
            <NavItem name="About" href="/about" />
            <NavItem name="Blog" href="/blog" />
            <NavItem name="Uses" href="/uses" />
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
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;

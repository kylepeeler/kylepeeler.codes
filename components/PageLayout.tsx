import React from 'react';
import NextLink from 'next/link';
import { Button, Flex, useColorMode, Stack } from '@chakra-ui/core';
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

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  /* @HACK: Setting this to negative HeaderLine's height makes position: sticky work smoother */
  margin-top: -10px;
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }: { children: React.ReactNode }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = {
    light: 'white',
    dark: 'gray.900'
  };
  const primarytextColor = {
    light: 'black',
    dark: 'white'
  };
  const navBgColor = {
    light: 'rgba(252, 252, 252, 0.8)',
    dark: 'rgba(23, 25, 35, 0.8)'
  };

  return (
    <>
      <HeaderLine />
      <StickyNav width="100%" bg={navBgColor[colorMode]} mb={8}>
        <Flex
          direction={['column', 'row']}
          justifyContent="space-between"
          alignItems="center"
          maxWidth={900}
          pt={8}
          pb={[2, 6]}
          px={[8]}
          width="100%"
          mx="auto"
        >
          <NextLink href="/" passHref>
            <a>
              <GradientText as="h3" size="lg" fontWeight={800}>
                kylepeeler.codes
              </GradientText>
            </a>
          </NextLink>
          <Flex
            as="nav"
            alignItems="center"
            fontFamily="Proxima Nova"
            fontWeight="bold"
            color="black"
            width={['100%', 'auto']}
            justifyContent={['space-between', 'space-evenly']}
          >
            <NextLink href="/" passHref>
              <Button as="a" variant="ghost" fontWeight="semibold" p={[1, 4]}>
                Home
              </Button>
            </NextLink>
            <NextLink href="/blog" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Blog
              </Button>
            </NextLink>
            <NextLink href="/about" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                About
              </Button>
            </NextLink>
            <DarkModeToggle
              checked={colorMode === 'dark'}
              onChange={toggleColorMode}
            />
          </Flex>
        </Flex>
      </StickyNav>
      <Flex
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        px={8}
      >
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          px={[0, 8]}
          maxWidth={900}
        >
          {children}
        </Stack>
        {/* <Footer /> */}
      </Flex>
    </>
  );
};

export default Container;

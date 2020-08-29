import Head from 'next/head';
import Link from 'next/link';

import Date from '../components/Date';
import Container from '../components/Container';
import { siteTitle } from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import { Stack, Flex, Heading, Text, useColorMode } from '@chakra-ui/core';
import { DarkModeToggle } from '../components/DarkModeToggle';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  };
}

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <Container>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            👋 Hey, I’m Kyle Peeler
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            I am front-end developer living in Carmel, IN. I love all things
            React, and am passionate about creating intuitive and beautiful user
            experiences for the web. Welcome to my playground.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          mt={8}
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Latest Blog Posts
          </Heading>
          {allPostsData.map(({ id, date, title }) => (
            <li className={`${utilStyles.listItem}`} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={`${utilStyles.lightText}`}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Projects
          </Heading>
          {/* <ProjectCard
            title="React 2025"
            description="Build and deploy a modern Jamstack application using the most popular open-source software."
            href="https://react2025.com/"
            icon="react2025"
          />
          <ProjectCard
            title="Mastering Next.js"
            description="A free video course for building static and server-side rendered applications with Next.js and React."
            href="https://masteringnextjs.com/"
            icon="nextjs"
          />
          <ProjectCard
            title="jamstackfns"
            description="The best serverless functions for JAMstack applications. Deploy to Vercel or Netlify for your static site."
            href="https://jamstackfns.com/"
            icon="jamstackfns"
          /> */}

          <p>
            You can find me on
            <a href="https://twitter.com/_kylepeeler"> Twitter </a>and on
            <a href="https://github.com/kylepeeler"> Github </a>.
          </p>
          <p>👷‍♂️🚧 This site is a work in progress!</p>
        </Flex>
        {/* <Timeline />
        <Subscribe /> */}
      </Stack>
    </Container>
  );
}

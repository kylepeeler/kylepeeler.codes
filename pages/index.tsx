import Link from 'next/link';

import Date from '../components/Date';
import GradientText from '../components/GradientText';
import PageLayout from '../components/PageLayout';
import { getSortedPostsData } from '../lib/posts';

import { Flex, Heading, Text, useColorMode, Button } from '@chakra-ui/core';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  };
}

const LandingHeadline = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.500',
    dark: 'gray.400'
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Flex mb={2}>
        <Heading as="h1" size="2xl" letterSpacing="tight">
          Hey 👋,{' '}
          <Flex display={['block', 'inline']}>
            I'm
            <GradientText as="span" size="2xl" letterSpacing="tight">
              &nbsp;Kyle Peeler
            </GradientText>
          </Flex>
        </Heading>
      </Flex>
      <Text color={secondaryTextColor[colorMode]}>
        I am front-end software engineer living in Carmel, IN. I love building
        intuitive and beautiful user experiences for the web. I mostly work with
        Javascript & React. Welcome to my playground.
      </Text>
    </Flex>
  );
};

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <PageLayout>
      <LandingHeadline />
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={8}
      >
        <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
          Latest Blog Posts
        </Heading>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
        <Button>View all Posts →</Button>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
          Projects
        </Heading>
        <p>
          You can find me on
          <a href="https://twitter.com/_kylepeeler"> Twitter </a>and on
          <a href="https://github.com/kylepeeler"> Github </a>.
        </p>
      </Flex>
      {/* <Timeline /> */}
    </PageLayout>
  );
}

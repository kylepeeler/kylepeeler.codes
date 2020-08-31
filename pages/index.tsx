import Link from 'next/link';
import { Flex, Heading, Button } from '@chakra-ui/core';

import Date from '../components/Date';
import LandingHeadline from '../components/LandingHeadline';
import PageLayout from '../components/PageLayout';
import { getSortedPostsData } from '../lib/posts';

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

import { Button, Text, Flex, Heading } from '@chakra-ui/core';

import LandingHeadline from '../components/LandingHeadline';
import LatestBlogPosts from '../components/LatestBlogPosts';
import PageLayout from '../components/PageLayout';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      posts: allPostsData
    }
  };
}

export default function Home({
  posts
}: {
  posts: {
    date: string;
    description: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <PageLayout>
      <LandingHeadline />
      <LatestBlogPosts posts={posts} />
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
          Projects
        </Heading>
        <Text>
          🚧👷‍♂️ This section is under construction, but for now, check them out
          on my Github!
        </Text>
        <a href="https://github.com/kylepeeler">
          <Button mt={4}>View Github Profile →</Button>
        </a>
      </Flex>
      {/* <Timeline /> */}
    </PageLayout>
  );
}

import React from 'react';
import NextLink from 'next/link';
import {
  Stack,
  Heading,
  Flex,
  Button,
  useColorMode,
  Text
} from '@chakra-ui/core';
import Date from '../components/Date';

export type PostType = {
  id: string;
  date: string;
  title: string;
  description: string;
};

export type LatestBlogPostsType = {
  posts: PostType[];
};

const BlogPost = ({ post }: { post: PostType }) => {
  const { id, title, date, description } = post;
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.500',
    dark: 'gray.400'
  };
  return (
    <NextLink href={`/posts/${id}`} passHref>
      <a>
        <Stack my={2} spacing={1}>
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>{description}</Text>
          <Text
            color={secondaryTextColor[colorMode]}
            fontWeight={300}
            fontSize="xs"
          >
            <Date dateString={date} />
          </Text>
          <small></small>
        </Stack>
      </a>
    </NextLink>
  );
};
const LatestBlogPosts = ({ posts }: LatestBlogPostsType) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      my={16}
    >
      <Heading letterSpacing="tight" mb={2} size="xl" fontWeight={700}>
        Latest Blog Posts
      </Heading>
      {posts?.map((post) => (
        <BlogPost post={post} key={post.id} />
      ))}

      <NextLink href={`/blog`} passHref>
        <a>
          <Button mt={3}>View All Posts →</Button>
        </a>
      </NextLink>
    </Flex>
  );
};

LatestBlogPosts.defaultProps = {
  posts: []
};

export default LatestBlogPosts;

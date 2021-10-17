import React from 'react';
import NextLink from 'next/link';
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

  return (
    <NextLink href={`/posts/${id}`} passHref>
      <a className="w-full">
        <div className="mb-8 w-full">
          <div className="flex flex-col justify-between">
            <h3 className="text-lg mg:text-xl font-medium w-full text-gray-600 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-500 dark:text-white">{description}</p>
            <span className="gray-500 dark:text-white font-light text-sx">
              <Date dateString={date} />
            </span>
            <small></small>
          </div>
        </div>
      </a>
    </NextLink>
  );
};
const LatestBlogPosts = ({ posts }: LatestBlogPostsType) => {
  return (
    <div
      className="w-full flex flex-col my-16"
      // flexDirection="column"
      // justifyContent="flex-start"
      // alignItems="flex-start"
      // my={16}
    >
      <h2 className="text-gray-700 block mb-4 text-3xl tracking-tight font-bold dark:text-white">
        Latest Blog Posts
      </h2>
      {posts?.map((post) => (
        <BlogPost post={post} key={post.id} />
      ))}

      <NextLink href={`/blog`} passHref>
        <a>
          <button className="mt-3 dark:text-white">View All Posts →</button>
        </a>
      </NextLink>
    </div>
  );
};

LatestBlogPosts.defaultProps = {
  posts: []
};

export default LatestBlogPosts;

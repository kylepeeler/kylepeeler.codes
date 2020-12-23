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
            <h3 className="text-lg mg:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
            <span className="gray-500 dark:gray-400 font-light text-sx">
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
      <h2 className="block mb-2 text-xl tracking-tight font-bold">
        Latest Blog Posts
      </h2>
      {posts?.map((post) => (
        <BlogPost post={post} key={post.id} />
      ))}

      <NextLink href={`/blog`} passHref>
        <a>
          <button className="mt-3">View All Posts →</button>
        </a>
      </NextLink>
    </div>
  );
};

LatestBlogPosts.defaultProps = {
  posts: []
};

export default LatestBlogPosts;

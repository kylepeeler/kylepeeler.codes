import React from 'react';
import NextLink from 'next/link';
import Date from '../components/Date';
import type { Blog } from 'contentlayer/generated';

export type LatestBlogPostType = Pick<
  Blog,
  'title' | 'description' | 'slug' | 'publishedAt' | 'readingTime'
>;

export type LatestBlogPostsType = {
  posts: LatestBlogPostType[];
};

export const BlogPost = ({ post }: { post: LatestBlogPostType }) => {
  const { slug, title, publishedAt, description, readingTime } = post;

  return (
    <NextLink href={`/blog/${slug}`} className="w-full">
      <div className="mb-8 w-full">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg mg:text-xl font-bold w-full text-gray-600 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-white">{description}</p>
          <span className="text-gray-500 dark:text-white font-light text-xs">
            <Date dateString={publishedAt} /> · {readingTime.text}
          </span>
        </div>
      </div>
    </NextLink>
  );
};

const LatestBlogPosts = ({ posts }: LatestBlogPostsType) => {
  return (
    <div className="w-full flex flex-col my-16">
      <h2 className="text-gray-700 block mb-4 text-3xl tracking-tight font-bold dark:text-white">
        Latest Blog Posts
      </h2>
      {posts?.slice(0, 3).map((post) => (
        <BlogPost post={post} key={post.slug} />
      ))}
      <NextLink href={`/blog`}>
        <button className="mt-3 text-gray-700 dark:text-white">
          View All Posts →
        </button>
      </NextLink>
    </div>
  );
};

LatestBlogPosts.defaultProps = {
  posts: []
};

export default LatestBlogPosts;

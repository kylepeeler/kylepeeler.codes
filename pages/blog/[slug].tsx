import { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { allBlogs } from '.contentlayer/data';
import { getMDXComponent } from 'mdx-bundler/client';

import Date from '../../components/Date';
import Head from 'next/head';
import Link from 'next/link';

import type { Blog } from '.contentlayer/types';

export default function Post({ post }: { post: Blog }) {
  const PostComponent = useMemo(
    () => getMDXComponent(post.body.code),
    [post.body.code]
  );
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Link href="/blog">
        <a className="text-sm mt-3 text-gray-700 dark:text-white">← Go Back</a>
      </Link>
      <br />
      <article>
        <h1 className="text-gray-700 block mb-4 text-3xl tracking-tight font-bold dark:text-white">
          {post.title}
        </h1>
        <div className="text-gray-500">
          <Date dateString={post.publishedAt} /> · {post.readingTime.text}
        </div>
        <br />
        <div className="prose dark:prose-dark dark:text-white">
          <PostComponent />
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for id
  return {
    paths: allBlogs.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const postData = await getPostData(params.id);
  const post = allBlogs.find((post) => post.slug === params.slug);
  return {
    props: {
      post
    }
  };
};

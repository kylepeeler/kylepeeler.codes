import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

import Date from '../../components/Date';

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({
  postData
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Link href="/blog">
        <a className="text-sm mt-3 text-gray-700 dark:text-white">← Go Back</a>
      </Link>
      <br />
      <article>
        <h1 className="text-gray-700 block mb-4 text-3xl tracking-tight font-bold dark:text-white">
          {postData.title}
        </h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div
          className="prose dark:text-white"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({
  params
}: {
  params: { id: string };
}) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
};

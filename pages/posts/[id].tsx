import Head from 'next/head';
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
      <a href="/">← Go Back</a>
      <br />
      <article>
        <h1 className="text-gray-800 font-medium text-2xl md:text-2xl tracking-tight mb-4">
          {postData.title}
        </h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div
          className="prose"
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

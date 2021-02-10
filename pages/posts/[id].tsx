import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/PageLayout';
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
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <a href="/">⬅ Go Back</a>
      <br />
      <article>
        <h1 className="font-medium text-2xl md:text-2xl tracking-tight mb-4">
          {postData.title}
        </h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
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

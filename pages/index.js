import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          👋 Hey! I am Kyle Peeler, a front-end developer 👨‍💻 living in Carmel,
          IN. I love all things React ⚛️, and am passionate about creating
          intuitive 🤗 and beautiful 🎨 user experiences for the web.
        </p>
        <p>
          You can find me on
          <a href="https://twitter.com/_kylepeeler"> Twitter </a>and on
          <a href="https://github.com/kylepeeler"> Github </a>.
        </p>
        <p>👷‍♂️🚧 This site is a work in progress!</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={`${utilStyles.headingLg}`}>Blog</h2>
        <ul className={`${utilStyles.list}`}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={`${utilStyles.listItem}`} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

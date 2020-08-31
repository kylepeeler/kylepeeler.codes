import LandingHeadline from '../components/LandingHeadline';
import LatestBlogPosts from '../components/LatestBlogPosts';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
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
      <Projects />
      <Timeline />
    </PageLayout>
  );
}

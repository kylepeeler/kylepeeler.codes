import LandingHeadline from '../components/LandingHeadline';
import LatestBlogPosts, {
  LatestBlogPostsType
} from '../components/LatestBlogPosts';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import { allBlogs } from '.contentlayer/data';

export async function getStaticProps() {
  const posts = allBlogs
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .slice(0, 3);

  return {
    props: {
      posts
    }
  };
}

export default function Home({ posts }: LatestBlogPostsType) {
  return (
    <>
      <LandingHeadline />
      <LatestBlogPosts posts={posts} />
      <Projects />
      <Timeline />
    </>
  );
}

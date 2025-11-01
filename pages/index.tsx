import Link from 'next/link';
import LandingHeadline from '../components/LandingHeadline';
import LatestBlogPosts, {
  LatestBlogPostsType
} from '../components/LatestBlogPosts';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import { allBlogs } from 'contentlayer/generated';

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
      <div className="flex justify-center my-8">
        <Link
          href="/racing-game"
          className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
        >
          🏎️ Play Racing Game
        </Link>
      </div>
      <LatestBlogPosts posts={posts} />
      <Projects />
      <Timeline />
    </>
  );
}

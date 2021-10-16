import { getSortedPostsData } from '../lib/posts';
import { BlogPost, PostType } from '../components/LatestBlogPosts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      posts: allPostsData
    }
  };
}

const Blog = ({ posts }: { posts: PostType[] }) => (
  <>
    <h1 className="text-gray-700 block mb-4 text-3xl tracking-tight font-bold dark:text-white">
      All Blog Posts
    </h1>
    <span className="text-gray-500">Check out some of my writings!</span>
    <br />
    {posts.map((post) => (
      <BlogPost post={post} key={post.id} />
    ))}
  </>
);

export default Blog;

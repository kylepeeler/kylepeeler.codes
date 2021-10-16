import { getSortedPostsData } from '../lib/posts';
import PageContentLayout from '../layouts/PageContentLayout';
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
    <PageContentLayout
      title="All Blog Posts"
      subtitle="Check out some of my writings!"
    >
      {posts.map((post) => (
        <BlogPost post={post} key={post.id} />
      ))}
    </PageContentLayout>
  </>
);

export default Blog;

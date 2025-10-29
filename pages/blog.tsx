import { allBlogs } from 'contentlayer/generated';
import Container from '../components/Container';
import pick from 'lodash/pick';
import { BlogPost, LatestBlogPostsType } from '../components/LatestBlogPosts';

export async function getStaticProps() {
  const posts = allBlogs
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .map((post) =>
      pick(post, ['slug', 'title', 'description', 'publishedAt', 'readingTime'])
    );

  return {
    props: {
      posts
    }
  };
}

const Blog = ({ posts }: LatestBlogPostsType) => {
  return (
    <Container title="All Blog Posts" subtitle="Check out some of my writings!">
      {posts.map((post) => (
        <BlogPost post={post} key={post.slug} />
      ))}
    </Container>
  );
};

export default Blog;

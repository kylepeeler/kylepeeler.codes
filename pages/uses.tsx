import { GetStaticProps } from 'next';
import { allPages, Page } from 'contentlayer/generated';
import Container from '../components/Container';

const Uses = ({ uses }: { uses: Page }) => {
  return (
    <Container
      title="What I Use"
      subtitle="Here is the gear I use to code, browse the internet, and listen to music."
    >
      <div 
        className="prose dark:prose-dark max-w-none"
        dangerouslySetInnerHTML={{ __html: uses.body.html }}
      />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const uses = allPages.find((page) => page.slug === 'uses');
  return {
    props: {
      uses
    }
  };
};

export default Uses;

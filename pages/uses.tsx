import { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import { allPages } from '.contentlayer/data';
import { Page } from '.contentlayer/types';
import Container from '../components/Container';

const Uses = ({ uses }: { uses: Page }) => {
  const UsesComponent = useMemo(
    () => getMDXComponent(uses.body.code),
    [uses.body.code]
  );
  return (
    <Container
      title="What I Use"
      subtitle="Here is the gear I use to code, browse the internet, and listen to music."
    >
      <UsesComponent />
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

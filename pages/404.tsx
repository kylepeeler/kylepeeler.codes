import { Heading } from '@chakra-ui/core';
import Layout from '../components/PageLayout';

export default function Custom404() {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Heading as="h1" size="xl">
          {' '}
          Page Not Found... 😢
        </Heading>
      </div>
    </Layout>
  );
}

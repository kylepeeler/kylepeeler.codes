import Layout from '../components/Layout';

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
        <h1> Page Not Found... 😢</h1>
      </div>
    </Layout>
  );
}

import Head from 'next/head';
import { useSession } from 'next-auth/react';

const ComponentHead = () => {
  const { data: session } = useSession();

  const titleOfPage = session ? 'Servers' : 'Login';
  return (
    <Head>
      <title>{titleOfPage}</title>
      <style>
        {`
        body {
          overflow: hidden;
        }
      `}
      </style>
    </Head>
  );
};

export default ComponentHead;

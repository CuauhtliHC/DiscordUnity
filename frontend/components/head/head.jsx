import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ComponentHead = () => {
  const router = useRouter();
  const { data } = useSession();
  const titleOfPage = router.query.id ? 'Guild' : data ? 'Servers' : 'Login';
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

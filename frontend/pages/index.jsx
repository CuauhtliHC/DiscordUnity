import Head from 'next/head';
import { useSession } from 'next-auth/react';
import ListGuilds from '../components/listGuilds/listGuilds.jsx';
import NavBar from '../components/navBar/navBar.jsx';
import Login from '../components/login/login.jsx';

const LoginPage = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <style>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      </Head>
      {data ? (
        <>
          <NavBar userData={data} />
          <ListGuilds accessToken={data.accessToken} />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default LoginPage;

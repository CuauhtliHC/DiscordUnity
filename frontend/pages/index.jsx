import { useSession } from 'next-auth/react';
import ListGuilds from '@/components/listGuilds/listGuilds.jsx';
import Login from '@/components/login/login.jsx';

const LoginPage = () => {
  const { data } = useSession();

  return (
    <>
      {data ? (
        <>
          <ListGuilds />
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

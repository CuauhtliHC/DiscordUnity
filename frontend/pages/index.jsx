import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import ListGuilds from '@/components/listGuilds/listGuilds.jsx';
import Login from '@/components/login/login.jsx';

const LoginPage = () => {
  const { data } = useSession();

  useEffect(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('guildId');
  }, []);

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

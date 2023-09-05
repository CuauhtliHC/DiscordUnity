import { useSession, signIn, signOut } from 'next-auth/react';
import ListGuilds from '../components/listGuilds/listGuilds';

export default function Component() {
  const { data } = useSession();

  if (data) {
    return (
      <>
        Signed in as {data.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <ListGuilds accessToken={data.accessToken} />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

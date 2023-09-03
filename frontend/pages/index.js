import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';

export default function Component() {
  const { data } = useSession();

  const getGuilds = async () => {
    console.log(data?.accessToken);
    try {
      const response = await axios.get(
        'https://discord.com/api/v10/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        },
      );

      console.log('Mis gremios:', response);
    } catch (error) {
      console.error('Error al obtener la lista de gremios:', error);
    }
  };

  if (data) {
    return (
      <>
        Signed in as {data.user.email} <br />
        {data.accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => getGuilds()}>Get My Guilds</button>
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

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useEffect } from 'react';
import { fetcher } from '@/utils/axiosGet';
import Game from '@/components/game/game';
import Head from 'next/head';

const GuildPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const idGuild = searchParams.get('id');
  const { data, error, isLoading } = useSWR(
    'https://discord.com/api/v10/users/@me/guilds',
  );
  const accessToken = session?.accessToken;
  const guildFound = data?.find((guild) => guild.id === idGuild);
  const {
    data: serverOnBot,
    error: serverOnBotError,
    isLoading: serverOnBotLoading,
  } = useSWR(
    `http://localhost:3001/api/guilds/checkBotThere/${idGuild}`,
    fetcher,
  );

  const titleOfPage = isLoading
    ? 'Loading'
    : guildFound
    ? guildFound.name
    : 'Guild';

  useEffect(() => {
    if (!session) {
      router.push('/');
    } else if (!isLoading && !guildFound) {
      router.push('/404');
    } else if (!serverOnBotLoading && !serverOnBot.botInGuild) {
      router.push(
        'https://discord.com/api/oauth2/authorize?client_id=672281194087448606&permissions=8&scope=bot',
      );
    }
  }, [accessToken, guildFound, isLoading, serverOnBotLoading]);

  return (
    <>
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
      <div
        className="bg-gray-900 min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/img/background.jpg")',
        }}
      >
        {serverOnBotLoading ? (
          <div
            className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>{serverOnBot.botInGuild && <Game />}</>
        )}
      </div>
    </>
  );
};

export default GuildPage;

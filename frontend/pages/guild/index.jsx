import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { botInGuild, getGuilds } from '@/utils/axiosGet';
import Game from '@/components/game/game';
import { dataGuilds } from 'hooks/arrayGuilds';

const GuildPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const searchParams = useSearchParams();
  const idGuild = searchParams.get('id');
  const [arrayGuilds, setGuilds] = useRecoilState(dataGuilds);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = data?.accessToken;
  const [serverOnBot, setServerOnBot] = useState(false);

  const guildFound = arrayGuilds?.guilds.some((guild) => guild.id === idGuild);

  useEffect(() => {
    if (!data) {
      router.push('/');
    }

    if (data && !guildFound) getGuilds(accessToken, setGuilds, arrayGuilds);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (guildFound) botInGuild(idGuild, setServerOnBot);

    if (!isLoading && !guildFound) {
      router.push('/404');
    } else if (!isLoading && !serverOnBot) {
      router.push(
        'https://discord.com/api/oauth2/authorize?client_id=672281194087448606&permissions=8&scope=bot',
      );
    }
  }, [accessToken, guildFound, isLoading]);

  return (
    <div
      className="bg-gray-900 min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("/img/background.jpg")',
      }}
    >
      {isLoading ? (
        <div
          className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>{serverOnBot && <Game />}</>
      )}
    </div>
  );
};

export default GuildPage;

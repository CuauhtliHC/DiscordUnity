import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getGuilds } from '../../utils/getGuilds';

const GuildPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const searchParams = useSearchParams();
  const idGuild = searchParams.get('id');
  const [arrayGuilds, setArrayGuilds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = data?.accessToken;

  useEffect(() => {
    if (data) getGuilds(accessToken, setArrayGuilds);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [accessToken]);

  const guildNotFound = arrayGuilds?.some((guild) => guild.id === idGuild);

  if (!isLoading && !guildNotFound) {
    router.push('/404');
    return null;
  }

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
        <></>
      )}
    </div>
  );
};

export default GuildPage;

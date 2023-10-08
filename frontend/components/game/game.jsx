import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Game = () => {
  const router = useRouter();
  const { data } = useSession();
  const { id } = router.query;

  return (
    <div>
      {data && (
        <iframe
          src={`/gameBuild/index.html?userId=${data.discordUser.id}&guildId=${id}`}
          title="Juego Unity WebGL"
          width="1280"
          height="720"
        />
      )}
    </div>
  );
};

export default Game;

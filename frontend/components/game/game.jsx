import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Game = () => {
  const router = useRouter();
  const { data } = useSession();
  const { id } = router.query;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (data) {
      setUserId(data.discordUser.id);
    }
  }, [data, id]);

  window.getUser = () => {
    if (userId) {
      return userId;
    } else {
      return null;
    }
  };

  return (
    <div>
      {data && (
        <iframe
          src={'/gameBuild/index.html'}
          title="Juego Unity WebGL"
          width="1300"
          height="800"
        />
      )}
    </div>
  );
};

export default Game;

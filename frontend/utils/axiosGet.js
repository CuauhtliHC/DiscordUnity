import axios from 'axios';
import { saveState } from './browserStorage';

const getGuilds = async (accessToken, setGuilds, guilds) => {
  const now = new Date();
  const ttl = 43200;
  try {
    if (!guilds || now.getTime() > guilds.expiry) {
      const response = await axios.get(
        'https://discord.com/api/v10/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const objWithGuilds = {
        guilds: response.data,
        expiry: now.getTime() + ttl,
      };
      saveState(response.data);
      setGuilds(objWithGuilds);
    }
  } catch (error) {
    console.error(error);
  }
};

const botInGuild = async (idGuild, serverOnBot) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/guilds/checkBotThere/${idGuild}`,
    );
    serverOnBot(response.data.botInGuild);
  } catch (error) {}
};

export { getGuilds, botInGuild };

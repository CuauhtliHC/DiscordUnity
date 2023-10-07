import axios from 'axios';

const getGuilds = async (accessToken, setArrayGuilds) => {
  try {
    const response = await axios.get(
      'https://discord.com/api/v10/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    setArrayGuilds(response.data);
  } catch (error) {}
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

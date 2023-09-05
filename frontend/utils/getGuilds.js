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

export { getGuilds };

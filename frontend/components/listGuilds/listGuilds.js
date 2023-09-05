import { useEffect, useState } from 'react';
import { getGuilds } from '../../utils/getGuilds';
import ImgGuild from './imgGuild';

const ListGuilds = ({ accessToken }) => {
  const [arrayGuilds, setArrayGuilds] = useState(null);
  useEffect(() => {
    getGuilds(accessToken, setArrayGuilds);
  }, [accessToken]);

  useEffect(() => {
    console.log(arrayGuilds);
  }, [arrayGuilds]);

  return (
    <>
      {arrayGuilds &&
        arrayGuilds.map((guild) => <ImgGuild guild={guild} key={guild.id} />)}
    </>
  );
};

export default ListGuilds;

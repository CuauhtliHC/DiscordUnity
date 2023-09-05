import Link from 'next/link';

const ImgGuild = ({ guild }) => {
  return (
    <Link href={`/guild/${guild.id}`}>
      <img
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
        alt="Icon guild"
      />
      <p>{guild.name}</p>
    </Link>
  );
};

export default ImgGuild;

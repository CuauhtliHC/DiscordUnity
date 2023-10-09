import Link from 'next/link';

const CardServer = ({ guild }) => {
  const { id, name, icon } = guild;
  const guildIcon = icon
    ? `https://cdn.discordapp.com/icons/${id}/${icon}.png`
    : '/img/logo.png';
  return (
    <Link href={`/guild?id=${id}`}>
      <div className="min-h-full relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
        <img
          className="w-20 h-20 object-cover object-center rounded-full"
          src={guildIcon}
          alt="Icon guild"
        />
        <h4 className="text-white text-2xl font-bold capitalize text-center">
          {name}
        </h4>
      </div>
    </Link>
  );
};

export default CardServer;

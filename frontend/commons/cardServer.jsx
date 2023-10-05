import Link from 'next/link';

const CardServer = ({ guild }) => {
  return (
    <Link href={`/guild/${guild.id}`}>
      <div className="min-h-full relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
        <img
          className="w-20 h-20 object-cover object-center rounded-full"
          src={
            guild.icon
              ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
              : '/img/logo.png'
          }
          alt="Icon guild"
        />
        <h4 className="text-white text-2xl font-bold capitalize text-center">
          {guild.name}
        </h4>
        {/* <p className="text-white/50">55 members</p>
      <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
        22 Online{' '}
        <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span>
      </p> */}
      </div>
    </Link>
  );
};

export default CardServer;

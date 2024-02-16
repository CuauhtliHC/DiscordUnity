import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import MenuTypeItems from '@/components/menu/menuTypeItems';
import MenuItems from '@/components/menu/menuItems';
import { post } from '@/utils/axiosPost';

const MenuComplete = ({ session }) => {
  const { data: listGuilds } = useSWR(
    'https://discord.com/api/v10/users/@me/guilds',
  );
  const { trigger } = useSWRMutation(
    'http://localhost:3001/api/user/update',
    post,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const dataUser = {
    idUser: session?.discordUser.id,
    listGuilds: listGuilds,
  };
  return (
    <div className="bg-gray-800 bg-opacity-50 flex-1 flex flex-col lg:flex-row max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl 2xl:h-[55rem]">
      <div>
        <img
          className="w-30 h-30 object-cover object-center"
          src={'/img/character/character.png'}
          alt="Img character"
        />
      </div>
      <div className="border-l border-solid border-gray-800" />
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <MenuTypeItems />
          <MenuItems />
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded ml-20 mt-2"
          onClick={() => trigger(dataUser)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MenuComplete;

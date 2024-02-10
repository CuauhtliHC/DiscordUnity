import CardItem from '@/commons/cardItems';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GiClothes } from 'react-icons/gi';
import { IoBody } from 'react-icons/io5';

const Profile = () => {
  const router = useRouter();
  const { data } = useSession();
  const items = ['Glasses', 'Shirt', 'Jacket', 'Pants', 'Shoes'];

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <Head>
        <title>{data?.discordUser.global_name}</title>
        <style>
          {`
            body {
                overflow: hidden;
            }
          `}
        </style>
      </Head>
      <div
        className="bg-gray-900 min-h-screen flex justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/img/background.jpg")',
        }}
      >
        <div className="bg-gray-800 bg-opacity-50 flex-1 flex flex-col lg:flex-row max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl 2xl:h-[55rem]">
          <div>
            <img
              className="w-30 h-30 object-cover object-center"
              src={'/img/character/character.png'}
              alt="Img character"
            />
          </div>
          <div className="border-l border-solid border-gray-800" />
          <div className="ml-10">
            <div className="bg-gray-50 border-gray-300 rounded-tl-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 max-h-10">
              <GiClothes className="w-10 h-10" />
            </div>
            <div className="bg-gray-50 border-gray-300 rounded-bl-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 max-h-10">
              <IoBody className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 flex-1 flex flex-col lg:flex-row lg:space-x-10 sm:p-6 sm:rounded-r-2xl sm:rounded-bl-2xl 2xl:h-[50rem] xl:h-[40rem] lg:h-[30rem] h-[30rem]">
            <div className="flex-1 px-2 sm:px-0">
              <div className="flex justify-between items-center">
                <div className="inline-flex">
                  {items.map((itemType, i) => (
                    <button
                      className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                      key={i}
                    >
                      {itemType}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-10 sm:mb-0 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-[50px] mt-5">
                <CardItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

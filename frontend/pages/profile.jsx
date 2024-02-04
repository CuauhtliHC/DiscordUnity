import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, []);
  return (
    <>
      {' '}
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
        <div className="bg-gray-800 bg-opacity-50 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl 2xl:h-[55rem] xl:h-[45rem] lg:h-[32rem] h-[35rem] overflow-auto">
          <div>
            <img
              className="w-30 h-30 object-cover object-center"
              src={'/img/character/character.png'}
              alt="Img character"
            />
          </div>
          <div>
            <ul>
              <li>hat</li>
              <li>glasses</li>
              <li>shirt</li>
              <li>jacket</li>
              <li>pants</li>
              <li>shoes</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

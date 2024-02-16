import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import fs from 'fs';
import MenuComplete from '@/components/menu/menuComplete';

const Profile = ({ folders }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title>{session?.discordUser.global_name}</title>
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
        <MenuComplete session={session} />
      </div>
    </>
  );
};

export default Profile;

export async function getStaticProps() {
  const folders = fs
    .readdirSync('public/img/character', { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((folder) => {
      const filesNames = fs.readdirSync(`public/img/character/${folder.name}`);
      return {
        dirName: folder.name,
        filesNames,
      };
    });
  return {
    props: {
      folders,
    },
  };
}

import { useEffect, useState } from 'react';
import { getGuilds } from '../../utils/getGuilds';
import CardServer from '../../commons/cardServer';

const ListGuilds = ({ accessToken }) => {
  const [arrayGuilds, setArrayGuilds] = useState(null);
  useEffect(() => {
    getGuilds(accessToken, setArrayGuilds);
  }, [accessToken]);

  return (
    <>
      <div
        className="bg-gray-900 min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/img/background.jpg")',
        }}
      >
        <div className="bg-gray-800 bg-opacity-50 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl h-[36rem] overflow-auto">
          <div className="flex-1 px-2 sm:px-0">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-extralight text-white/50">
                Servers
              </h3>
            </div>
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-[50px]">
              {arrayGuilds &&
                arrayGuilds.map((guild) => (
                  <CardServer guild={guild} key={guild.id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListGuilds;

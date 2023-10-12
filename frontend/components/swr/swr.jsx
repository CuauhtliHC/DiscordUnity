import axios from 'axios';
import { useSession } from 'next-auth/react';
import { SWRConfig } from 'swr';

const SwrComponent = ({ children }) => {
  const { data } = useSession();

  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          axios
            .get(url, {
              headers: {
                Authorization: `Bearer ${data.accessToken}`,
              },
            })
            .then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrComponent;

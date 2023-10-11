import { useSession } from 'next-auth/react';
import NavBar from './navBar';

const ComponentNavBar = () => {
  const { data } = useSession();
  return <>{data && <NavBar userData={data} />}</>;
};

export default ComponentNavBar;

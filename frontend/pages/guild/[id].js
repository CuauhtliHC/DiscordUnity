import { useRouter } from 'next/router';

const Guild = () => {
  const router = useRouter();
  const { id } = router.query;
  return <>{id}</>;
};

export default Guild;

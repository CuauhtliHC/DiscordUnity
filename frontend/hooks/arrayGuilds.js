import { atom } from 'recoil';
import { loadStorage } from '@/utils/browserStorage';

const dataGuilds = atom({
  key: 'dataGuilds',
  default: loadStorage(),
});

export { dataGuilds };

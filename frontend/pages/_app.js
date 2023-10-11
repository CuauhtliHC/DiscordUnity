import { SessionProvider } from 'next-auth/react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import '@/styles/global.css';
import ComponentNavBar from '@/components/navBar';
import ComponentHead from '@/components/head/head';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ComponentHead />
        <ComponentNavBar />
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

import { SessionProvider } from 'next-auth/react';
import '@/styles/global.css';
import ComponentNavBar from '@/components/navBar';
import ComponentHead from '@/components/head/head';
import SwrComponent from '@/components/swr/swr';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SwrComponent>
        <ComponentHead />
        <ComponentNavBar />
        <Component {...pageProps} />
      </SwrComponent>
    </SessionProvider>
  );
}

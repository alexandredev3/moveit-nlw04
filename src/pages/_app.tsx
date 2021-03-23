import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';

import { GlobalStyle } from '../styles/global';

import { ToastProvider } from '../contexts/ToastContext';
import { SWRProviderConfig } from '../contexts/SWRConfigContext';

import '../styles/nprogress.css';

NProgress.configure({
  showSpinner: false
})

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      return NProgress.start();
    });
    router.events.on('routeChangeComplete', () => {
      return NProgress.done();
    });
    router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }, [router])

  return (
    <ToastProvider>
      <SWRProviderConfig>
        <Provider session={pageProps.session}>
          <GlobalStyle />
          <Component {...pageProps} />
        </Provider>
      </SWRProviderConfig>
    </ToastProvider>
  );
}

export default MyApp;

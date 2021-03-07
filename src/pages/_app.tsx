import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';

import { GlobalStyle } from '../styles/global';

import '../styles/nprogress.css';
import { useEffect } from 'react';

NProgress.configure({
  showSpinner: false,
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
    
      return alert('Erro ao tentar carregar a página, tente novamente.')
    });
  }, [router])

  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

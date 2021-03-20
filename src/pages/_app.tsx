import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import { SWRConfig } from 'swr';
import NProgress from 'nprogress';

import { GlobalStyle } from '../styles/global';

import { ToastProvider } from '../contexts/ToastContext';

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
    
      return alert('Erro ao tentar carregar a página, tente novamente.')
    });
  }, [router])

  return (
    <ToastProvider>
      <SWRConfig
        value={{
          onError: (error) => {
            return alert('Ocorreu um error inesperado, tente novamente mais tarde...')
          },
          onErrorRetry: (error, _, config, revalidate, { retryCount }) => {
            if (error.status === 500) {
              alert("Ocorreu um erro no servidor tente novamente mais tarde.");
            }
    
            if (retryCount >= 5) {
              return alert(
                "Ocorreu um error inesperado, tente novamente mais tarde..."
              );
            }
    
            setTimeout(() => {
              return revalidate({ retryCount: retryCount + 1 });
            }, 5000);
          }
        }}
      >
        <Provider session={pageProps.session}>
          <GlobalStyle />
          <Component {...pageProps} />
        </Provider>
      </SWRConfig>
    </ToastProvider>
  );
}

export default MyApp;

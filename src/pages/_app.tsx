import Router from 'next/router';
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';

import { GlobalStyle } from '../styles/global';

import '../styles/nprogress.css';

NProgress.configure({
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => {
  return NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  return NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();

  return alert('Erro ao tentar carregar a página, tente novamente.')
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

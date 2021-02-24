import { GlobalStyle } from '../styles/global';

import { ChallengeProvider } from '../contexts/ChallengeContext';

function MyApp({ Component, pageProps }) {

  
  return (
    <ChallengeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChallengeProvider>
  );
}

export default MyApp;

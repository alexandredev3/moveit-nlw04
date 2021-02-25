import { ChallengeProvider } from '../contexts/ChallengeContext';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChallengeProvider>
  );
}

export default MyApp;

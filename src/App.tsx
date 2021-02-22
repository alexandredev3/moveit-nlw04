import { GlobalStyle } from './styles/global';

import { ExperienceBar } from './components/ExperienceBar';

import { Container } from './styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <ExperienceBar />
      </Container>
    </>
  );
}

export default App;

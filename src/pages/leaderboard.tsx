import Head from 'next/head';
import { 
  ContainerLeaderboard,
  Container,
  Main,
  Header,
  RowsContainer,
  UserInfoContainer,
} from '../styles/pages/leaderboard';

import { Sidebar } from '../components/Sidebar';
import { UserLeaderboard } from '../components/UserLeaderboard';
 
export default function Leaderboard() {
  return (
    <ContainerLeaderboard>
      <Sidebar />
      <Container>
          <Head>
            <title>Leaderboard | move.it</title>
          </Head>

        <Header>
          <h1>Leaderboard</h1>
        </Header>

        <Main>
          <RowsContainer>
            <span id="position__row">
              Posição
            </span>
            <span id="user__row">
              Usuário
            </span>
            <span id="challenges__row">
              Desafios
            </span>
            <span id="experience__row">
              Experiência
            </span>
          </RowsContainer>
          <UserInfoContainer>
            <span id="position">
              1
            </span>
            <span id="user">
              <UserLeaderboard 
                name="Alexandre Costa"
                level={1}
                imgUrl="https://github.com/alexandredev3.png"
              />
            </span>
            <span id="challenges">
              <strong>127</strong> completados
            </span>
            <span id="experience">
              <strong>154000</strong> xp
            </span>
          </UserInfoContainer>
        </Main>
      </Container>
    </ContainerLeaderboard>
  );
}
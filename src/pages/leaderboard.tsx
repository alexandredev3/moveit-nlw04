import Head from 'next/head';
import { 
  ContainerLeaderboard,
  Container,
  Main,
  Header,
  Table,
} from '../styles/pages/leaderboard';

import { Sidebar } from '../components/Sidebar';
import { UserLeaderboard } from '../components/UserLeaderboard';
 
export default function Leaderboard() {
  return (
    <ContainerLeaderboard>
      <Sidebar page="leaderboard" />
      <Container>
          <Head>
            <title>Leaderboard | move.it</title>
          </Head>

        <Header>
          <h1>Leaderboard</h1>
        </Header>

        <Main>
          <Table>
            <thead>
              <tr>
                <th className="position__head">
                  Posição
                </th>
                <th>
                  Usuário
                </th>
                <th>
                  Desafios
                </th>
                <th>
                  Experiência
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="position__body">
                  1
                </td>
                <td>
                  <UserLeaderboard 
                    name="Alexandre Costa"
                    level={1}
                    imgUrl="https://github.com/alexandredev3.png"
                  />
                </td>
                <td>
                  <strong>127</strong> completados
                </td>
                <td>
                  <strong>154000</strong> xp
                </td>
              </tr>
            </tbody>
          </Table>
        </Main>
      </Container>
    </ContainerLeaderboard>
  );
}
import Head from 'next/head';
import useSWR from 'swr';

import { fetcher } from '../services/fetcher';

import {
  ContainerLeaderboard,
  Container,
  Main,
  Header,
  Table,
} from '../styles/pages/leaderboard';

import { Sidebar } from '../components/Sidebar';
import { UserLeaderboard } from '../components/UserLeaderboard';

interface IChallenge {
  _id: string;
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  user: {
    id: string;
    name: string;
    avatar: string;
  }
}

export default function Leaderboard() {
  const { data } = useSWR(`/challenge/leaderboard?page=${1}`, fetcher);

  if (!data) {
    return <h2>Loading...</h2>
  }

  console.log(data)

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
            {
              data.leaderboard.challenges.map((challenge: IChallenge, index) => {
                const positionCount = index + 1;

                return (
                  <tbody
                    key={challenge._id}
                  >
                    <tr>
                      <td className="position__body">
                        {positionCount}
                      </td>
                      <td>
                        <UserLeaderboard 
                          name={challenge.user.name}
                          level={challenge.level}
                          imgUrl={challenge.user.avatar}
                        />
                      </td>
                      <td>
                        <strong>{challenge.challengesCompleted}</strong> completados
                      </td>
                      <td>
                        <strong>{challenge.currentExperience}</strong> xp
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
          </Table>
        </Main>
      </Container>
    </ContainerLeaderboard>
  );
}
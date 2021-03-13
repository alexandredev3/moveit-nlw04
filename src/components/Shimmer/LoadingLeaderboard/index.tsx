import { Table, UserLeaderboard, AvatarContainer, UserInfo } from './styles';

import Skeleton from '../../Skeleton';
import { Sidebar } from '../../Sidebar';
import { ContainerLeaderboard, Container, Header, Main } from '../../../styles/pages/leaderboard';

export function LoadingLeaderboard() {
  const iterable = Array.from({ length: 5 }, (_, index) => index + ' Item ');

  return (
    <ContainerLeaderboard>
      <Sidebar page="leaderboard" />
      <Container>
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
            {iterable.map(() => {
              return (
                <tbody>
                  <tr>
                    <td className="position__body">
                      <Skeleton className="position__skeleton" />
                    </td>
                    <td>
                      <UserLeaderboard>
                        <AvatarContainer>
                          <Skeleton className="avatar__skeleton" />
                        </AvatarContainer>
                        <UserInfo>
                          <Skeleton className="name__skeleton" />
                          <Skeleton className="level__skeleton" />
                        </UserInfo>
                      </UserLeaderboard>
                    </td>
                    <td>
                      <Skeleton className="challengesCompleted__skeleton" />
                    </td>
                    <td>
                      <Skeleton className="currentExperience__skeleton" />
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </Table>
        </Main>
      </Container>
    </ContainerLeaderboard>
  );
}
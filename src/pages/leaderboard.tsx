import { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import { fetcher } from '../services/fetcher';

import {
  ContainerLeaderboard,
  Container,
  Main,
  Header,
  Table,
  PaginateContainer,
  PrevPageButton,
  NextPageButton,
} from '../styles/pages/leaderboard';

import { Sidebar } from '../components/Sidebar';
import { UserLeaderboard } from '../components/UserLeaderboard';
import { LoadingLeaderboard } from '../components/Shimmer/LoadingLeaderboard';

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
  const [page, setPage] = useState(1);
  const { data } = useSWR(`/challenge/leaderboard?page=${page}`, fetcher);

  if (!data) {
    return <LoadingLeaderboard />;
  }

  const pages = data.leaderboard.totalPage;
  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  function handleNextPage() {
    if (isLastPage) {
      return;
    }

    const nextPage = page + 1

    setPage(nextPage);
  }

  function handlePrevPage() {
    if (isFirstPage) {
      return;
    }
    
    const prevPage = page - 1;

    setPage(prevPage);
  }

  return (
    <ContainerLeaderboard>
      <Sidebar page="leaderboard" />
      <Container>
          <Head>
            <title>Leaderboard | move.it</title>

            <meta name="description" content="Fique entre os melhores!" />

            <meta property="og:site_name" content="Move.it" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content="Move.it" />
            <meta property="og:url" content="https://moveit-alexandredev3.vercel.app/" />
            <meta property="og:description" content="Fique entre os melhores!" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://moveit-alexandredev3.vercel.app/" />
            <meta property="twitter:title" content="Move.it" />
            <meta property="twitter:description" content="Fique entre os melhores!" />
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

        <PaginateContainer>
          {
            pages !== 1 && (
              <>
                <PrevPageButton
                  onClick={handlePrevPage}
                  disabled={isFirstPage}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 13.0002H2" stroke="#5965E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13 24.0002L2 13.0002L13 2.00024" stroke="#5965E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Anterior</span>
                </PrevPageButton>
                <NextPageButton
                  onClick={handleNextPage}
                  disabled={isLastPage}
                >
                  <span>Próximo</span>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 13L22 13" stroke="#5965E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13 2L24 13L13 24" stroke="#5965E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </NextPageButton>
              </>
            )
          }
        </PaginateContainer>
      </Container>
    </ContainerLeaderboard>
  );
}
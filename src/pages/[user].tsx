import { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, ISession } from 'next-auth/client';

import { ContainerHome, Container, Section } from '../styles/pages/app';
import getChallenge from './api/challenge/getChallenge';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';
import { useToast } from '../contexts/ToastContext';
import { api } from 'services/api';

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  session: ISession | null;
}

function Home({ 
  level, 
  challengesCompleted, 
  currentExperience, 
  session
}: IHomeProps) {
  const { showToast } = useToast();

  useEffect(() => {
    const isNewUser = session.user.isNewUser;

    if (isNewUser) {
      showToast({
        type: 'success',
        title: 'Cadastro feito com sucesso!',
        description: 
          `Olá ${session.user.name}. Seja bem-vindo ao Move.it! Agora todo o seu progresso será salvo e você pode aparecer no Leaderboard e ficar entre os melhores!`
      });

      api.put('/users/updateNewUser');
    }
  }, []);

  return (
    <ContainerHome>
      <Sidebar page="home" />
      <ChallengeProvider
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
      >
        <Container>
          <Head>
            <title>{session.user.name} | move.it</title>

            <meta name="description" content="Avance para o próximo level com o move.it" />

            <meta property="og:site_name" content="Move.it" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content="Move.it" />
            <meta property="og:url" content="https://moveit-alexandredev3.vercel.app/" />
            <meta property="og:description" content="Avance para o próximo level com o move.it" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://moveit-alexandredev3.vercel.app/" />
            <meta property="twitter:title" content="Move.it" />
            <meta property="twitter:description" content="Avance para o próximo level com o move.it" />
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <Section>
              <div>
                <Profile 
                  name={session.user.name}
                  imgUrl={session.user.image}
                /> 
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </Section>
          </CountdownProvider>
        </Container>
      </ChallengeProvider>
    </ContainerHome>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const { challenge } = await getChallenge(session);

  console.log(challenge);

  return {
    props: {
      level: challenge.level,
      currentExperience: challenge.currentExperience,
      challengesCompleted: challenge.challengesCompleted,
      session: session,
    }
  }
}

export default Home;

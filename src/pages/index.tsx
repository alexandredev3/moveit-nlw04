import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, ISession } from 'next-auth/client';
import getChallenge from './api/getChallenge';

import { ContainerHome, Container, Section } from '../styles/pages/app';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';
import { Unauthenticated } from '../components/Unauthenticated';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';

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
            <title>Inicio | move.it</title>
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <Section>
              <div>
                {
                  session ? (
                    <Profile 
                      name={session.user.name}
                      imgUrl={session.user.image}
                    />
                  ) : (
                    <Unauthenticated />
                  )
                }
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
    const { level, currentExperience, challengesCompleted } = context.req.cookies;

    return {
      props: {
        level: Number(level ?? 1),
        currentExperience: Number(currentExperience ?? 0),
        challengesCompleted: Number(challengesCompleted ?? 0),
        session: null,
      }
    }
  }

  const { challenge } = await getChallenge(session);

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

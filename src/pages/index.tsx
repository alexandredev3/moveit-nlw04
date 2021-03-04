import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { ContainerHome, Container, Section } from '../styles/pages/app';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';
import { SigninMessage } from '../components/SigninMessage';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';

interface ISession {
  user: {
    name: string;
    image: string;
  };
  accessToken: string;
  expires: Date;
}

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
                    <SigninMessage />
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
  const { req } = context;
  // todos os cookies da nossa aplicação.
  const { level, currentExperience, challengesCompleted } = req.cookies;
  const session = await getSession(context);

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      session: session ?? null,
    }
  }
}

export default Home;

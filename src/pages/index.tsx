import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { ContainerHome, Container, Section } from '../styles/pages/app';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar'
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
}

function Home({ 
  level, 
  challengesCompleted, 
  currentExperience, 
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

            <meta name="description" content="O Move.it é um app que usa a técnica de Pomodoro, esse app faz com que pessoas que passa muito tempo na frente do computador realizar exercícios físicos." />

            <meta property="og:site_name" content="Move.it" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content="Move.it" />
            <meta property="og:url" content="https://moveit-alexandredev3.vercel.app/" />
            <meta property="og:description" content="O Move.it é um app que usa a técnica de Pomodoro, esse app faz com que pessoas que passa muito tempo na frente do computador realizar exercícios físicos." />

            <meta property="og:image:type" content="image/png" />
            
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://moveit-alexandredev3.vercel.app/" />
            <meta property="twitter:title" content="Move.it" />
            <meta property="twitter:description" content="O Move.it é um app que usa a técnica de Pomodoro, esse app faz com que pessoas que passa muito tempo na frente do computador realizar exercícios físicos." />
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <Section>
              <div>
                <Unauthenticated />
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
      }
    }
  }

  return {
    redirect: {
      destination: `/${session.user.github_profile.username}`,
      permanent: false,
    }
  }
}

export default Home;

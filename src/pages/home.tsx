import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';

import { ContainerHome, Container, Section } from '../styles/pages/app';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({ level, challengesCompleted, currentExperience }: IHomeProps) {

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
                <Profile 
                  name="Alexandre"
                  imgUrl="https://github.com/alexandredev3.png"
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
  const { req } = context;

  // todos os cookies da nossa aplicação.
  const { level, currentExperience, challengesCompleted } = req.cookies;

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    }
  }
}

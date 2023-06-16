'use client';

import { useChallenge } from '@/contexts/ChallengeContext';

import { Container } from './styles';

export function ProfileLevel() {
  const { level } = useChallenge();

  return (
    <Container>
      <p>
        <img src="icons/level.svg" alt="Level icon"/>
        Level {level}
      </p>
    </Container>
  );
}

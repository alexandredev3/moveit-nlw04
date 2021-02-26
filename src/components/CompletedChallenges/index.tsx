import { useChallenge } from '../../contexts/ChallengeContext';

import { CompletedChallengesContainer } from './styles';

export function CompletedChallenges() {
  const { challengesCompleted } = useChallenge()

  return (
    <CompletedChallengesContainer>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </CompletedChallengesContainer>
  );
}
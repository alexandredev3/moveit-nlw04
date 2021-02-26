import { useState } from 'react';
import { useChallenge } from '../../contexts/ChallengeContext';
import { Header } from './styles';

import { ProgressBarContainer, ProgressBar, CurrentExperience } from './styles';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useChallenge(); 

  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel)

  return (
    <Header>
      <span>{currentExperience} xp</span>
      <ProgressBarContainer>
        <ProgressBar percentToNextLevel={percentToNextLevel} />
        <CurrentExperience
          percentToNextLevel={percentToNextLevel}
        >
          {currentExperience} xp
        </CurrentExperience>
      </ProgressBarContainer>
      <span>{experienceToNextLevel} xp</span>
    </Header>
  );
}
import { useState } from 'react';
import { Header } from './styles';

import { ProgressBarContainer, ProgressBar, CurrentExperience } from './styles';

export function ExperienceBar() {
  const [xpCount, setXpCount] = useState(20);

  return (
    <Header>
      <span>{xpCount} xp</span>
      <ProgressBarContainer>
        <ProgressBar xpCount={xpCount} />
        <CurrentExperience
          xpCount={xpCount}
        >
          {xpCount} xp
        </CurrentExperience>
      </ProgressBarContainer>
      <span>600 xp</span>
    </Header>
  );
}
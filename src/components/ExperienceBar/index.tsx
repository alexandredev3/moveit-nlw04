import { useState } from 'react';
import { Header } from './styles';

import { ProgressBarContainer, ProgressBar, CurrentExperience } from './styles';

export function ExperienceBar() {
  const [level, setLevel] = useState(90);

  return (
    <Header>
      <span>0 xp</span>
      <ProgressBarContainer>
        <ProgressBar level={level} />
        <CurrentExperience
          level={level}
        >
          {level} xp
        </CurrentExperience>
      </ProgressBarContainer>
      <span>600 xp</span>
    </Header>
  );
}
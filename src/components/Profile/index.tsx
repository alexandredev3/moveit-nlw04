import React from 'react';
import { useChallenge } from '../../contexts/ChallengeContext';

import { ProfileContainer } from './styles';

export function Profile() {
  const { level } = useChallenge();

  return (
    <ProfileContainer>
      <img src="https://github.com/alexandredev3.png" alt="Alexandre Costa"/>
      <div>
        <strong>Alexandre Costa</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level {level}
        </p>
      </div>
    </ProfileContainer>
  );
}
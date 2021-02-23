import React from 'react';

import { ProfileContainer } from './styles';

export function Profile() {
  return (
    <ProfileContainer>
      <img src="https://github.com/alexandredev3.png" alt="Alexandre Costa"/>
      <div>
        <strong>Alexandre Costa</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level 9999+
        </p>
      </div>
    </ProfileContainer>
  );
}
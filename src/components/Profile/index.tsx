import React from 'react';

import { ProfileContainer } from './styles';

import { useChallenge } from '../../contexts/ChallengeContext';

interface Props {
  name: string;
  imgUrl: string;
}

export function Profile({
  name,
  imgUrl
}: Props) {
  const { level } = useChallenge();

  return (
    <ProfileContainer className="profile__container">
      <img src={imgUrl} alt={`${name} Avatar`} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level {level}
        </p>
      </div>
    </ProfileContainer>
  );
}
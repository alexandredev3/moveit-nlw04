import React from 'react';

import { UserLeaderboardContainer } from './styles';

interface Props {
  name: string;
  level: number;
  imgUrl: string;
}

export function UserLeaderboard({
  name,
  level,
  imgUrl
}: Props) {
  return (
    <UserLeaderboardContainer>
      <img src={imgUrl} alt={`${name} avatar`} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level {level}
        </p>
      </div>
    </UserLeaderboardContainer>
  );
}
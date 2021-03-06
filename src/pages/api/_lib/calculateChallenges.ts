interface IUserStatus {
  activeChallenge: {
    type: "body" | "eye";
    amount: number;
    description: string;
  };
  challenge: {
    level: number;
    challengesCompleted: number;
    currentExperience: number;
    experienceToNextLevel: number;
  };
}

export function calculateChallenges({
  activeChallenge,
  challenge,
}: IUserStatus) {
  let _level = 1;
  let _challengesCompleted = 0;
  let _finalExperience = 0;

  const experienceToNextLevel = Math.pow((_level + 1) * 4, 2);
  const { amount } = activeChallenge;

  if (challenge) {
    const { currentExperience, level, challengesCompleted } = challenge;

    _challengesCompleted = challengesCompleted;

    _finalExperience = currentExperience + amount;

    if (_finalExperience >= experienceToNextLevel) {
      _finalExperience = _finalExperience - experienceToNextLevel;
      _level = level + 1;
    }
  }

  return {
    level: _level,
    challengesCompleted: _challengesCompleted + 1,
    currentExperience: _finalExperience,
    experienceToNextLevel,
  };
}

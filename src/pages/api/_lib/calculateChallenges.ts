interface CalculateChallenges {
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

function handleExperienceToNextLevel(level: number | null) {
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  return experienceToNextLevel;
}

function handleCompleteChallenge(challengesCompleted: number | null) {
  const challengeCompletedCount = challengesCompleted + 1;

  return challengeCompletedCount;
}

function handleLevelUp(currentLevel: number) {
  const level = currentLevel + 1;

  return level;
}

function handleFinalExperience(
  currentExperience: number,
  level: number,
  amount: number,
  experienceToNextLevel: number
) {
  let finalExperience = currentExperience + amount;
  let finalLevel = level;

  if (finalExperience >= experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel;
    finalLevel = handleLevelUp(finalLevel);
  }

  return {
    finalExperience,
    finalLevel,
  };
}

export function calculateChallenges({
  activeChallenge,
  challenge,
}: CalculateChallenges) {
  const { amount } = activeChallenge;

  const experienceToNextLevel = handleExperienceToNextLevel(challenge.level);
  const challengesCompleted = handleCompleteChallenge(
    challenge.challengesCompleted
  );
  const { finalExperience, finalLevel } = handleFinalExperience(
    challenge.currentExperience,
    challenge.level,
    amount,
    experienceToNextLevel
  );

  return {
    level: finalLevel,
    challengesCompleted,
    currentExperience: finalExperience,
    experienceToNextLevel,
  };
}

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
  if (!level) {
    const experienceToNextLevel = Math.pow((1 + 1) * 4, 2);

    return experienceToNextLevel;
  }

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  return experienceToNextLevel;
}

function handleCompleteChallenge(challengesCompleted: number | null) {
  if (!challengesCompleted) {
    const challengeCompletedCount = 0 + 1;

    return challengeCompletedCount;
  }

  const challengeCompletedCount = challengesCompleted + 1;

  return challengeCompletedCount;
}

function handleLevelUp(currentLevel: number) {
  const level = currentLevel + 1;

  return level;
}

function handleFinalExperience(
  currentExperience: number | null,
  level: number | null,
  amount: number,
  experienceToNextLevel: number
) {
  if (!currentExperience) {
    let finalExperience = 0 + amount;
    let finalLevel = 1;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      finalLevel = handleLevelUp(finalLevel);
    }

    return {
      finalExperience,
      finalLevel,
    };
  }

  let finalExperience = currentExperience + amount;
  let finalLevel = level;

  console.log(currentExperience);

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

  const experienceToNextLevel = handleExperienceToNextLevel(challenge?.level);
  const challengesCompleted = handleCompleteChallenge(
    challenge?.challengesCompleted
  );
  const { finalExperience, finalLevel } = handleFinalExperience(
    challenge?.currentExperience,
    challenge?.level,
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

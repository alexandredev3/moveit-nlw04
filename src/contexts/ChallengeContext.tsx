import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import challenges from '../../challenges.json';

interface IChallenge {
  type: 'body' | 'eye' | string;
  description: string;
  amount: number;
}

interface IChallengeContextData {
  level: number; 
  currentExperience: number; 
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: IChallenge;
  levelUp: () => void; 
  startNewChallenge: () => void; 
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface IChallengeProvider {
  children: ReactNode;
}

export const ChallengeContext = createContext<IChallengeContextData>({} as IChallengeContextData);

export function ChallengeProvider({ children }: IChallengeProvider) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<IChallenge | null>(null);

  // pow calculo de potencia.
  // 4 e o fator de experiencia, mude esse valor se voce quiser deixar mais facil ou dificil
  const experienceToNextLevel = Math.pow((level + 1) * 10, 2);

  const levelUp = useCallback(() => {
    setLevel(level + 1)
  }, [level]);

  const startNewChallenge = useCallback(() => {
    // gerar numero aleatorio de 0 ate a quantidade de dasafios que temos no JSON.
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(() => {
    const { amount } = activeChallenge;
    const totalExperience = currentExperience + amount;

    if (totalExperience >= experienceToNextLevel) {
      setActiveChallenge(null);
      setCurrentExperience(0);
      return setChallengesCompleted(challengesCompleted + 1);
    }

    setActiveChallenge(null);
    setCurrentExperience(amount);
  }, [activeChallenge])

  return (
    <ChallengeContext.Provider
      value={
        { 
          level, 
          currentExperience, 
          challengesCompleted,
          activeChallenge,
          experienceToNextLevel,
          levelUp, 
          startNewChallenge, 
          resetChallenge,
          completeChallenge,
        }
    }
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const context = useContext(ChallengeContext);

  if (!context) {
    throw new Error('useChallenge must be within the ChallengeProvider')
  }

  return context;
}


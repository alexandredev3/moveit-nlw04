'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/client';
import Cookies from 'js-cookie';

import challenges from '../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { api } from 'services/api';
import { useToast } from '../contexts/ToastContext';

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
  closeLevelUpModal: () => void;
}

interface IChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext<IChallengeContextData>({} as IChallengeContextData);

export function ChallengeProvider({ children, ...rest }: IChallengeProviderProps) {
  // const [session, loading] = useSession();
  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
  const [activeChallenge, setActiveChallenge] = useState<IChallenge | null>(null);
  const [isLevelUpModalOpen, setIsModalLevelUpOpen] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const { showToast } = useToast();

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    // if (!session && !loading) {
    //   Cookies.set('level', String(level));
    //   Cookies.set('currentExperience', String(currentExperience));
    //   Cookies.set('challengesCompleted', String(challengesCompleted));
    // }
  }, [level, currentExperience, challengesCompleted]);

  const closeLevelUpModal = useCallback(() => {
    if (!setIsModalLevelUpOpen) {
      return;
    }

    setIsModalLevelUpOpen(false);
  }, []);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
    setIsModalLevelUpOpen(true);
  }, [level]);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setChallengeIndex(randomChallengeIndex);
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();
    
    const reachedTheScreenLimitForNotification = window.screen.width < 720;

    if (!reachedTheScreenLimitForNotification) {
      if (Notification.permission === 'granted') {
        new Notification('Novo desafio', {
          body: `Valendo ${challenge.amount}xp`,
        });
      }
    }
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(async () => {
    if (!activeChallenge) {
      return;
    }

    try {
      const { amount } = activeChallenge;

      let finalExperience = currentExperience + amount;
  
      if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
      }
  
      setActiveChallenge(null);
      setCurrentExperience(finalExperience);
      setChallengesCompleted(challengesCompleted + 1);
  
      // if (session) {
      //   await api.post(`/challenge/${challengeIndex}`);
      // }
    } catch(err) {
      showToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao mandar os dados para o servidor, tente novamente...',
      })
    }
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
          closeLevelUpModal,
        }
    }
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal /> }
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

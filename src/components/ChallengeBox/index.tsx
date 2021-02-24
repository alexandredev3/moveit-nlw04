import React from 'react';
import { useChallenge } from '../../contexts/ChallengeContext';

import { 
  ChallengeBoxContainer,
  ChallengeNotActive,
  ChallengeActive,
  Header,
  Main,
  Footer,
  ChallengeFailedButton,
  ChallengeSucceededButton,
} from './styles';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenge();

  return (
    <ChallengeBoxContainer>
      {activeChallenge ? (
        <ChallengeActive>
          <Header>Ganhe {activeChallenge.amount} xp</Header>

          <Main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Body icon"/>
            <strong>Novo desafio</strong>
            <p>
              {activeChallenge.description}
            </p>
          </Main>

          <Footer>
            <ChallengeFailedButton
              type="button"
              onClick={resetChallenge}
            >
              Falhei
            </ChallengeFailedButton>
            <ChallengeSucceededButton
              type="button"
              onClick={completeChallenge}
            >
              Completei
            </ChallengeSucceededButton>
          </Footer>
        </ChallengeActive>
      ) : (
        <ChallengeNotActive>
          <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up icon"/>
              Avance de level completando desafios.
            </p>
        </ChallengeNotActive>
      )}
    </ChallengeBoxContainer>
  );
}
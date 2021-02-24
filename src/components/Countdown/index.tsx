import React, { useState, useEffect } from 'react';

import { CountdownContainer, CountdownButton } from './styles';

import { useChallenge } from '../../contexts/ChallengeContext';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useChallenge(); 

  // 25 minutos representado em segundos.
  const startTime = 0.1 * 60

  const [time, setTime] = useState(startTime);
  const [isActive, setIsActive] = useState(false);
  const [hasTimeFinished, setHasTimeFinished] = useState(false);

  const minutes = Math.floor(time / 60); 
  // arredondando minutos para evitar numeros quebrados
  const seconds = time % 60; 
  // resto da divicao

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasTimeFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountdown() {
    return setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    return setTime(startTime);
  }

  return (
    <div>
      <CountdownContainer>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </CountdownContainer>

      {hasTimeFinished ? (
        <CountdownButton
          disabled
          type="button" 
          active={isActive}
        >
            Ciclo encerrado
        </CountdownButton>
      ) : (
        <>
          {isActive ? (
            <CountdownButton 
              type="button" 
              onClick={resetCountdown} 
              active={isActive}
            >
              Abandonar ciclo
            </CountdownButton>
          ) : (
            <CountdownButton 
              type="button" 
              onClick={startCountdown} 
              active={isActive}
            >
              Iniciar um ciclo
            </CountdownButton>
          )}
        </>
      )}
    </div>
  );
}
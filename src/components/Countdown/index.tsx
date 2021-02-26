import { useState, useEffect } from 'react';
import { useCountdown } from '../../contexts/CountdownContext';

import { CountdownContainer, CountdownButton } from './styles';

export function Countdown() {
  const { 
    minutes,
    seconds, 
    hasTimeFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
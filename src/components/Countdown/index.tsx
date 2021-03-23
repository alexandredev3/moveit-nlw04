import { motion } from 'framer-motion';
import { useCountdown } from '../../contexts/CountdownContext';

import { CountdownContainer, CountdownButton } from './styles';

export function Countdown() {
  const { 
    minutes,
    seconds, 
    hasTimeFinished, 
    isActive, 
    startTime,
    time,
    resetCountdown, 
    startCountdown
  } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const timeLeft = Math.round((time * 100) / startTime);

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
        <motion.div
          whileTap={{
            scale: 1,
          }}
          whileHover={{
            scale: 1.03,
          }}
        >
          {isActive ? (
            <CountdownButton 
              type="button" 
              onClick={resetCountdown} 
              active={isActive}
              timeLeft={timeLeft}
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
        </motion.div>
      )}
    </div>
  );
}
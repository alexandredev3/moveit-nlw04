import { useEffect, useState } from 'react';
import { IToastMessage, useToast } from '../../../contexts/ToastContext';
import { motion } from 'framer-motion';

import { Container, IconContainer, Infos } from './styles';

interface IToastProps {
  message: IToastMessage;
}

const icons = {
  info: <img src="/icons/alert.svg" alt="Alert Icon"/>,
  success: <img src="/icons/check-circle.svg" alt="Check Icon"/>,
  error: <img src="/icons/error.svg" alt="Error Icon"/>,
}

const variants = {
  hide: {
    x: "40vw",
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  }
}

export function Toast({ message }: IToastProps) {
  const { hideToast } = useToast();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseOut, setIsMouseOut] = useState(true);

  const { title, description, type, id } = message;

  useEffect(() => {
    if (isMouseOut) {
      const timer = setTimeout(() => {
        hideToast(id)
      }, 5000);

      /**
       * Precisamos limpar o timeout
       * porque caso tenha mais de um toast em tela, quando o timeout acabar
       * os toast's que restam vão sair e entrar na tela.
       */
      return () => {
        clearTimeout(timer);
      }
    }
  }, [hideToast, id, isMouseOut]);

  function handleMouseOver() {
    setIsMouseOut(false);
    setIsMouseOver(true);
  }

  function handleMouseOut() {
    setIsMouseOut(true);
    setIsMouseOver(false);
  }

  return (
    <Container
      onClick={() => hideToast(id)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      as={motion.div}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: 'spring',
        duration: 0.4,
        bounce: 0.25
      }}
      variants={variants}
      initial="hide"
      animate="show"
    >
      <IconContainer>
        {icons[type]}
      </IconContainer>
      <Infos>
        <h3>{title}</h3>
        <p>{description}</p>
      </Infos>
    </Container>
  );
}
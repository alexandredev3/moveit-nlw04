import { motion } from 'framer-motion';

import { IToastMessage } from '../../contexts/ToastContext';

import { Container } from './styles';

import { Toast } from './Toast';

interface IToastContainerProps {
  messages: IToastMessage[];
}

export function ToastContainer({ messages }: IToastContainerProps) {
  return (
    <Container>
      {messages.map((message) => {
        return (
          <Toast 
            key={message.id} 
            message={message} 
          />
        );
      })}
    </Container>
  );
}
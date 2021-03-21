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
          <motion.div 
            style={{ marginBottom: 12 }}
            transition={{
              type: 'spring',
              duration: 0.4,
              bounce: 0.25
            }}
            variants={{
              hide: {
                x: "40vw",
                opacity: 0,
              },
              show: {
                x: 0,
                opacity: 1,
              }
            }}
            initial="hide"
            animate="show"
          >
            <Toast key={message.id} message={message} />
          </motion.div>
        );
      })}
    </Container>
  );
}
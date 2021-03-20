import { IToastMessage, useToast } from '../../../contexts/ToastContext';

import { Container, IconContainer, Infos } from './styles';

interface IToastProps {
  message: IToastMessage;
}

const icons = {
  info: <img src="/icons/alert.svg" alt="Alert Icon"/>,
  success: <img src="/icons/check-circle.svg" alt="Check Icon"/>,
  error: <img src="/icons/error.svg" alt="Error Icon"/>,
}

export function Toast({ message }: IToastProps) {
  const { hideToast } = useToast();

  const { title, description, type, id } = message;

  return (
    <Container
      onClick={() => hideToast(id)}
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
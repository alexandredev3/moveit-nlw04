import { useChallenge } from '../../contexts/ChallengeContext';
import { 
  Container,
  Overlay,
  Header,
} from './styles';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useChallenge();

  return (
    <Overlay>
      <Container>
        <Header>{level}</Header>

        <strong>Parabéns!</strong>
        <p>Você alcaçou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar modal icon"/>
        </button>
      </Container>
    </Overlay>
  );
}
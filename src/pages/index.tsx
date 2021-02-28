import { 
  Container,
  Section,
  Form,
  Github,
  InputBlock,
  Button,
} from '../styles/pages/login';

export default function Login() {
  return (
    <Container>
      <img src="/icons/simbolo.svg" alt="Simbolo icon"/>
      <Section>
        <img src="/logo-full.svg" alt="Full logo"/>
        <Form>
          <h1>Bem-vindo</h1>
          <Github>
            <img src="/icons/github.svg" alt="Github logo"/>
            <span>Faça login com seu Github para começar</span>
          </Github>
          <InputBlock>
            <input type="text" placeholder="Digite seu username"/>
            <Button type="button">
              <img src="/icons/arrow-right.svg" alt="Seta para esquerta icon"/>
            </Button>
          </InputBlock>
        </Form>
      </Section>
    </Container>
  );
} 
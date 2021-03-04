import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/client';
import { getSession } from 'next-auth/client';

import { 
  Container,
  Section,
  Form,
  Github,
  InputBlock,
  Button,
} from '../styles/pages/signin';

export default function SignIn() {
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
            <Button type="button" onClick={() => signIn('github')}>
              <span>Fazer login com Github</span>
              <img src="/icons/github.svg" alt="Seta para esquerta icon"/>
            </Button>
          </InputBlock>
        </Form>
      </Section>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
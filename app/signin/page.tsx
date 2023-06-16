import { SignInButton } from '@/components/SignInButton';

import { 
  Container,
  Section,
  Form,
  Github,
  InputBlock
} from './styles';

export const metadata = {
  title: "Signin",
};

export default async function Page() {
  return (
    <>
      {/* <Head>
        <title>Faça login com seu Github para começar</title>

        <meta
          name="description"
          content="Faça login com seu Github para começar"
        />

        <meta property="og:site_name" content="Move.it" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Move.it" />
        <meta
          property="og:url"
          content="https://moveit-alexandredev3.vercel.app/"
        />
        <meta
          property="og:description"
          content="Faça login com seu Github para começar"
        />

        <meta
          property="twitter:url"
          content="https://moveit-alexandredev3.vercel.app/"
        />
        <meta property="twitter:title" content="Move.it" />
        <meta
          property="twitter:description"
          content="Faça login com seu Github para começar"
        />
      </Head> */}
      <Container>
        <img src="/icons/simbolo.svg" alt="Simbolo icon" />
        <Section>
          <img src="/logo-full.svg" alt="Full logo" />
          <Form>
            <h1>Bem-vindo</h1>
            <Github>
              <img src="/icons/github.svg" alt="Github logo" />
              <span>Faça login com seu Github para começar</span>
            </Github>
            <InputBlock>
              <SignInButton />
            </InputBlock>
          </Form>
        </Section>
      </Container>
    </>
  );
}

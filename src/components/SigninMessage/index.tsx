import Link from 'next/link';

import { SigninMessageContainer } from './styles';

export function SigninMessage() {
  return (
    <SigninMessageContainer>
      <span>Faça login para salvar sua experiência.</span>
      <Link href="/signin">
        <a>
          <img src="/icons/login.svg" alt="Login Icon"/>
        </a>
      </Link>
    </SigninMessageContainer>
  );
}
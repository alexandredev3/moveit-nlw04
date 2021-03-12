import Link from 'next/link';

import { SigninUnauthenticated } from './styles';

export function Unauthenticated() {
  return (
    <SigninUnauthenticated>
      <span>Faça login para salvar sua experiência para sempre! <br/></span>
      <Link href="/signin">
        <a>
          <img src="/icons/login.svg" alt="Login Icon"/>
        </a>
      </Link>
    </SigninUnauthenticated>
  );
}
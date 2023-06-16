import Link from 'next/link';

import { ProfileLevel } from './ProfileLevel';

import { ProfileContainer, SigninUnauthenticated } from './styles';

import { getServerUserSession } from '@/lib/get-server-user-session';

export async function UserProfile() {
  const session = await getServerUserSession();

  return (
    <>
      {session ? (
        <ProfileContainer className="profile__container">
          <img src={session.image} alt={`${session.name} Avatar`} />
          <div>
            <strong>{session.name}</strong>
            <ProfileLevel />
          </div>
        </ProfileContainer>
      ) : (
        <SigninUnauthenticated>
          <span>Faça login para salvar sua experiência para sempre! <br/></span>
          <Link href="/signin">
            <img src="/icons/login.svg" alt="Login Icon"/>
          </Link>
        </SigninUnauthenticated>
      )}
    </>
  );
}
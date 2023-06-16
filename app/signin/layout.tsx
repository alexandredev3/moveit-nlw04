import type { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { getServerUserSession } from '@/lib/get-server-user-session';

export default async function SignInLayout({ children }: PropsWithChildren) {
  const session = await getServerUserSession();

  if (session) {
    redirect('/');
  }

  return (
    <>
      {children}
    </>
  );
}
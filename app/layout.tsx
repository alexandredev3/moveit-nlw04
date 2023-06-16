import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { inter } from '@/styles/fonts';
import { StyledComponentsRegistry } from '@/lib/styled-components-registry';

import { GlobalStyle } from '@/styles/global';

export const metadata: Metadata = {
  title: {
    template: '%s | Move.it',
    default: 'Move.it'
  },
  description: 'Welcome to Move.it!',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
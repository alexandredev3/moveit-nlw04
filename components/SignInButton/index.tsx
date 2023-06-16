'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

import { Button } from './styles';

export function SignInButton() {
  return (
    <Button
      type="button"
      onClick={() => signIn("github")}
      as={motion.button}
      whileTap={{
        scale: 1,
      }}
      whileHover={{
        scale: 1.03,
      }}
    >
      <span>Fazer login com Github</span>
      <img src="/icons/github.svg" alt="Seta para esquerta icon" />
    </Button>
  )
}

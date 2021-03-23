import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

import { useToast } from './ToastContext'; 

interface ISWRProviderConfigProps {
  children: ReactNode;
}

/**
 * Creating this context here, We'll be able to use the ToastContext.
 * We have now a Global Error Handling.
 */
export function SWRProviderConfig({ children }: ISWRProviderConfigProps) {
  const { showToast } = useToast();

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          showToast({
            type: 'error',
            title: 'Erro',
            description: String(error)
          })
        },
        onErrorRetry: (error, _, config, revalidate, { retryCount }) => {
          if (error.status === 500) {
            showToast({
              type: 'error',
              title: 'Erro',
              description: "Ocorreu um erro interno no servidor"
            })
          }
    
          if (retryCount >= 5) {
            return showToast({
              type: 'error',
              title: 'Erro',
              description: `${String(error)}.`
            })
          }
    
          setTimeout(() => {
            return revalidate({ retryCount: retryCount + 1 });
          }, 5000);
        }
      }}
    >
      {children}
    </SWRConfig>
  )
}
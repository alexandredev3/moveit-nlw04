import { createContext, ReactNode, useContext } from 'react';
import { SWRConfig } from 'swr';

import { useToast } from './ToastContext'; 

interface ISWRProviderConfigProps {
  children: ReactNode;
}

/**
 * Creating this context here, I will be able to use the ToastContext.
 * Now we have a Global Error Handling.
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
            console.log(error)
    
            showToast({
              type: 'error',
              title: 'Erro',
              description: "Ocorreu um erro interno no servidor, tente novamente mais tarde..."
            })
          }
    
          if (retryCount >= 5) {
            showToast({
              type: 'error',
              title: 'Erro',
              description: `${String(error)}. tentando novamente...`
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
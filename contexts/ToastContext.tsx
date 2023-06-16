import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer } from '../components/ToastContainer';

interface IToastProviderProps {
  children: ReactNode;
}

export interface IToastMessage {
  id: string;
  type: 'error' | 'info' | 'success';
  title: string;
  description: string;
}

interface IToastContextData {
  showToast(message: Omit<IToastMessage, 'id'>): void;
  hideToast(id: string): void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

export function ToastProvider({ children }: IToastProviderProps) {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const showToast = useCallback(({ type, title, description }: Omit<IToastMessage, 'id'>) => {
    const id = uuidv4();

    const toastData = {
      id,
      type,
      title,
      description,
    };

    // setando o estado dessa forma,
    // não vamos precisar colocar a variavel no array de dependecias.
    setMessages((state) => [...state, toastData]);
  }, []);

  const hideToast = useCallback((id: string) => {
    const toastFiltered = messages.filter((message) => message.id !== id);

    setMessages(toastFiltered);
  }, [messages]);

  return (
    <ToastContext.Provider
      value={{ showToast, hideToast }}
    >
      {children}
      <ToastContainer 
        messages={messages}
      />
    </ToastContext.Provider>
  );
}

export function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
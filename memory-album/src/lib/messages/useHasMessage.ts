import { useMessageStore } from '@/store/useMessageStore';
import { useState } from 'react';

export const useHasMessage = (roomId: string) => {
  const getMessages = useMessageStore((state) => state.getMessages);
  const [hasMessage, setHasMessage] = useState(false);

  const checkMessages = () => {
    if (!hasMessage) {
      const messages = getMessages(roomId);
      if (messages.length > 0) {
        setHasMessage(true);
      }
    }
  };

  return { hasMessage, checkMessages };
};

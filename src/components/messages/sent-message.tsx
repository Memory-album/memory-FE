import { useEffect, useRef } from 'react';

import { useMessageStore } from '@/store/useMessageStore';
import { MessageItem } from './message-item';

type Props = {
  roomId: string;
};
export const SentMessage = ({ roomId }: Props) => {
  const { getMessages } = useMessageStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = getMessages(roomId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex mb-24 flex-col items-end">
      {messages &&
        messages.map((message) => (
          <MessageItem key={message.id} roomId={roomId} message={message} />
        ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

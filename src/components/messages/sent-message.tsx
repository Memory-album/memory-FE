import { MessageItem } from './message-item';

type Message = {
  id: number;
  content: string;
};

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const SentMessage = ({ messages, setMessages }: Props) => {
  return (
    <div className="flex flex-col items-end">
      {messages &&
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            setMessages={setMessages}
          />
        ))}
    </div>
  );
};

import { MessageItem } from './message-item';

type Props = {
  messages: string[];
};

export const SentMessage = ({ messages }: Props) => {
  return (
    <div className="flex flex-col items-end">
      {messages && messages.map((message) => <MessageItem message={message} />)}
    </div>
  );
};

import { AnswerMessage } from './answer-message';

type Props = {
  messages: string[];
};

export const Answers = ({ messages }: Props) => {
  return (
    <div className="flex flex-col items-end">
      {messages &&
        messages.map((message) => <AnswerMessage message={message} />)}
    </div>
  );
};

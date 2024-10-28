import { Answers } from './answers';
import { Questions } from './questions';

type Props = {
  messages: string[];
};
export const AnswerContent = ({ messages }: Props) => {
  return (
    <div className="overflow-y-auto mb-24">
      <div className="relative flex justify-center items-center w-full aspect-auto mb-[30px]">
        <img
          className="rounded-md object-cover"
          src="/images/example.png"
          alt="앨범 사진"
        />
      </div>
      <Questions />
      <Answers messages={messages} />
    </div>
  );
};

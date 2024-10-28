import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { MdKeyboardVoice } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

type Props = {
  currentView: (view: string) => void;
  onUploadMessage: (message: string[]) => void;
};

export const AnswerInput = ({ currentView, onUploadMessage }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 w-full sm:w-[500px] sm:m-auto flex items-center bg-white">
      <Button
        className="size-9 mr-[14px] bg-[#699BF7] text-white rounded-full"
        onClick={() => {
          currentView('recording');
        }}
      >
        <MdKeyboardVoice
          style={{ width: '24px !important', height: '24px !important' }}
        />
      </Button>
      <div className="grow relative">
        <Input
          className="h-10 rounded-[20px] focus-visible:ring-transparent text-base"
          placeholder="답장 보내기..."
        />
        {/* TODO: 텍스트를 입력할 때만 전송 버튼 보이게 */}
        <Button className="absolute top-1 right-2 w-11 h-8 rounded-[20px] bg-[#4848F9] text-white">
          <IoIosSend
            style={{ width: '20px !important', height: '20px !important' }}
          />
        </Button>
      </div>
    </div>
  );
};

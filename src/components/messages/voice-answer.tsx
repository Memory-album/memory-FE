import { MdKeyboardVoice } from 'react-icons/md';
import { Alert } from './alert';

type Props = {
  onNextView: () => void;
  message: string;
};

export const VoiceAnswer = ({ onNextView, message }: Props) => {
  return (
    <div className="flex flex-col items-center h-screen pb-[110px] overflow-hidden">
      <p className="w-[330px] py-5 bg-white rounded-[20px] text-[#4848F9] font-semibold text-2xl border-2 border-solid border-[#4848F9] text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {message}
      </p>
      <div className="flex flex-col items-center m-auto">
        <p className="size-[150px] mb-2">
          <MdKeyboardVoice className="size-full bg-[#4848F9] text-white rounded-full" />
        </p>
        <p className="font-semibold text-3xl text-center text-slate-200 animate-pulse">
          음성 인식 중이에요...
        </p>
      </div>
      <Alert
        onNextView={onNextView}
        description="ai가 음성을 추출하고 있어요. <br /> 답변을 요약해서 보여드릴게요."
      />
    </div>
  );
};

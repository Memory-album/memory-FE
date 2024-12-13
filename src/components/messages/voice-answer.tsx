import { MdKeyboardVoice } from 'react-icons/md';
import { Alert } from './alert';
import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';

type Props = {
  message: string;
  nextView: string;
};

export const VoiceAnswer = ({ message, nextView }: Props) => {
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const { handleFileProcessing } = useFileProcessing(nextView);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        recorder.ondataavailable = (e) => {
          setChunks((prevChunks) => [...prevChunks, e.data]);
        };

        recorder.start();
        setMedia(recorder);
        setIsRecording(true);
      })
      .catch(() => {
        alert('마이크 사용 권한을 허용해야 녹음을 진행할 수 있습니다.');
      });
  };

  const handleOffRecord = () => {
    if (media) {
      media.stop();
      setIsRecording(false);
      console.log(chunks);
    }
  };

  const handleSubmitAudioFile = () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    handleFileProcessing(audioBlob, 'audio');
  };

  return (
    <div className="flex flex-col items-center h-screen pb-[110px] overflow-hidden">
      <p className="w-[330px] py-5 bg-white rounded-[20px] text-[#4848F9] font-semibold text-2xl border-2 border-solid border-[#4848F9] text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {message}
      </p>
      <div className="flex flex-col items-center m-auto">
        <p className="size-[150px] mb-3">
          <MdKeyboardVoice className="size-full bg-[#4848F9] text-white rounded-full" />
        </p>
        <p
          className={cn(
            'font-semibold text-3xl text-center text-gray-400 ',
            isRecording ? 'animate-pulse' : undefined,
          )}
        >
          {isRecording
            ? '음성 인식 중이에요..'
            : '시작 버튼을 누르고 말해보세요'}
        </p>
      </div>
      {!isRecording ? (
        <RecordingButton onClick={handleStartRecording} buttonValue="시작" />
      ) : (
        <RecordingButton onClick={handleOffRecord} buttonValue="그만하기" />
      )}
      <Alert
        onClick={handleSubmitAudioFile}
        description="ai가 음성을 추출하고 있어요. <br /> 답변을 요약해서 보여드릴게요."
        disabled={chunks.length === 0 || isRecording}
      />
    </div>
  );
};

type ButtonProps = {
  onClick: () => void;
  buttonValue: string;
};

const RecordingButton = ({ onClick, buttonValue }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="mb-3 border-[2px] border-slid border-[#4848F9] bg-white hover:bg-white text-[#4848F9]"
    >
      {buttonValue}
    </Button>
  );
};

import { MdKeyboardVoice } from 'react-icons/md';
import { Alert } from './alert';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = {
  message: string;
  nextView: string;
};

export const VoiceAnswer = ({ message, nextView }: Props) => {
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  let chunks: Blob[] = [];
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<Blob>();
  const [isLoading, setIsLoading] = useState(false);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
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
      media.ondataavailable = function (e) {
        chunks.push(e.data);
        setAudioUrl(e.data);
      };
      media.stop();
      setIsRecording(false);
      setIsLoading(true);
    }
    console.log(chunks);
  };

  const onSubmitAudioFile = useCallback(() => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    setIsLoading(true);

    if (audioUrl) {
      const audio = new Audio(URL.createObjectURL(audioUrl));
      audio.play();
    }
  }, [audioUrl]);

  const handleSubmitAudioFile = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 7000);
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
            'font-semibold text-3xl text-center text-slate-200 ',
            isRecording ? 'animate-pulse' : undefined,
          )}
        >
          {isRecording ? '음성 인식 중이에요...' : '녹음을 시작하세요'}
        </p>
      </div>
      {!isRecording ? (
        <Button onClick={startRecording}>녹음 시작</Button>
      ) : (
        <Button onClick={handleOffRecord}>녹음 종료</Button>
      )}
      {/* <Button onClick={onSubmitAudioFile}>결과 확인</Button> */}
      <Alert
        nextView={nextView}
        isLoading={isLoading}
        onClick={handleSubmitAudioFile}
        description="ai가 음성을 추출하고 있어요. <br /> 답변을 요약해서 보여드릴게요."
      />
    </div>
  );
};

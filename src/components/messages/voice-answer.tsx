// import { MdKeyboardVoice } from 'react-icons/md';
// import { Alert } from './alert';
// import { useState } from 'react';
// import { Button } from '../ui/button';
// import { cn } from '@/lib/utils';

// type Props = {
//   message: string;
//   chunks: Blob[];
//   setChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
//   onSubmitAudioFile: () => void;
// };

// export const VoiceAnswer = ({
//   message,
//   chunks,
//   setChunks,
//   onSubmitAudioFile,
// }: Props) => {
//   const [media, setMedia] = useState<MediaRecorder | null>(null);
//   const [isRecording, setIsRecording] = useState(false);

//   const handleStartRecording = () => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

//         recorder.ondataavailable = (e) => {
//           setChunks((prevChunks) => [...prevChunks, e.data]);
//         };

//         recorder.start();
//         setMedia(recorder);
//         setIsRecording(true);
//       })
//       .catch(() => {
//         alert('마이크 사용 권한을 허용해야 녹음을 진행할 수 있습니다.');
//       });
//   };

//   const handleOffRecord = () => {
//     if (media) {
//       media.stop();
//       setIsRecording(false);
//       console.log(chunks);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center h-screen pb-[110px] overflow-hidden">
//       <p className="w-[330px] py-5 bg-white rounded-[20px] text-[#4848F9] font-semibold text-2xl border-2 border-solid border-[#4848F9] text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
//         {message}
//       </p>
//       <div className="flex flex-col items-center m-auto">
//         <p className="size-[150px] mb-3">
//           <MdKeyboardVoice className="size-full bg-[#4848F9] text-white rounded-full" />
//         </p>
//         <p
//           className={cn(
//             'font-semibold text-3xl text-center text-gray-400 ',
//             isRecording ? 'animate-pulse' : undefined,
//           )}
//         >
//           {isRecording
//             ? '음성 인식 중이에요..'
//             : '시작 버튼을 누르고 말해보세요'}
//         </p>
//       </div>
//       {!isRecording ? (
//         <RecordingButton onClick={handleStartRecording} buttonValue="시작" />
//       ) : (
//         <RecordingButton onClick={handleOffRecord} buttonValue="그만하기" />
//       )}
//       <Alert
//         onClick={onSubmitAudioFile}
//         description="ai가 음성을 추출하고 있어요. <br /> 답변을 요약해서 보여드릴게요."
//         disabled={chunks.length === 0 || isRecording}
//       />
//     </div>
//   );
// };

// type ButtonProps = {
//   onClick: () => void;
//   buttonValue: string;
// };

// const RecordingButton = ({ onClick, buttonValue }: ButtonProps) => {
//   return (
//     <Button
//       onClick={onClick}
//       className="mb-3 border-[2px] border-slid border-[#4848F9] bg-white hover:bg-white text-[#4848F9]"
//     >
//       {buttonValue}
//     </Button>
//   );
// };

import { useState, useEffect } from 'react';
import {
  MdKeyboardVoice,
  MdMic,
  MdStop,
  MdDelete,
  MdPlayArrow,
  MdPause,
} from 'react-icons/md';
import { LuWaves } from 'react-icons/lu';
import { Alert } from './alert';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = {
  message: string;
  chunks: Blob[];
  setChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
  onSubmitAudioFile: () => void;
};

export const VoiceAnswer = ({
  message,
  chunks,
  setChunks,
  onSubmitAudioFile,
}: Props) => {
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  // 녹음 시간 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else if (!isRecording && recordingDuration !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording, recordingDuration]);

  // 녹음된 오디오 URL 생성
  useEffect(() => {
    if (chunks.length > 0 && !isRecording) {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      const audio = new Audio(url);
      setAudioElement(audio);

      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [chunks, isRecording]);

  // 컴포넌트 언마운트 시 리소스 정리
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleStartRecording = () => {
    // 이전 녹음 데이터 초기화
    setChunks([]);
    setAudioUrl(null);
    setRecordingDuration(0);

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          sampleRate: 48000, // 샘플 레이트 명시적 지정
          channelCount: 1, // 모노 녹음
          echoCancellation: true,
        },
      })
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

  const handleStopRecording = () => {
    if (media) {
      media.stop();
      setIsRecording(false);
    }
  };

  const handleDeleteRecording = () => {
    setChunks([]);
    setAudioUrl(null);
    setRecordingDuration(0);
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const handleTogglePlayback = () => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-grow flex flex-col items-center min-h-screen pb-[ForFnbmarginBottom]">
      {/* 메시지 카드 */}
      <div className="w-full max-w-md px-4">
        <div className="py-4 px-6 bg-white rounded-2xl text-[#4848F9] font-semibold text-xl border border-blue-200 text-center shadow-sm">
          {message}
        </div>
      </div>

      {/* 녹음 영역 */}
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full',
            isRecording ? 'bg-red-50 p-8 animate-pulse' : 'bg-blue-50 p-6',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-full transition-all duration-300',
              isRecording ? 'bg-red-500 size-24' : 'bg-[#4848F9] size-28',
            )}
          >
            {isRecording ? (
              <MdMic className="size-12 text-white" />
            ) : (
              <MdKeyboardVoice className="size-14 text-white" />
            )}
          </div>

          {isRecording && (
            <div className="absolute -bottom-2 bg-white px-4 py-1 rounded-full shadow-sm border border-red-100">
              <div className="flex items-center gap-2 text-red-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                {formatTime(recordingDuration)}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          {isRecording ? (
            <p className="font-medium text-red-600 animate-pulse flex items-center gap-2 justify-center">
              <LuWaves className="size-5" />
              음성 녹음 중...
            </p>
          ) : audioUrl ? (
            <p className="font-medium text-blue-600">녹음이 완료되었습니다!</p>
          ) : (
            <p className="font-medium text-gray-600">
              시작 버튼을 누르고 말해보세요
            </p>
          )}
        </div>

        {/* 오디오 플레이어 - 녹음 후에만 표시 */}
        {audioUrl && !isRecording && (
          <div className="mt-6 flex items-center gap-4">
            <Button
              onClick={handleTogglePlayback}
              className="bg-transparent hover:bg-gray-200 rounded-full h-10 w-10 border-blue-200"
            >
              {isPlaying ? (
                <MdPause className="size-5 text-blue-600" />
              ) : (
                <MdPlayArrow className="size-5 text-blue-600" />
              )}
            </Button>

            <div className="w-32 h-2 bg-blue-100 rounded-full">
              <div
                className={cn(
                  'h-full bg-[#4848F9] rounded-full',
                  isPlaying ? 'animate-pulse' : '',
                )}
                style={{ width: isPlaying ? '100%' : '0%' }}
              ></div>
            </div>

            <Button
              onClick={handleDeleteRecording}
              className="bg-transparent hover:bg-gray-200 rounded-full h-10 w-10 border-red-200"
            >
              <MdDelete className="size-5 text-red-600" />
            </Button>
          </div>
        )}
      </div>

      {/* 액션 버튼 영역 */}
      <div className="mt-auto w-full flex flex-col items-center gap-3">
        {!isRecording && !audioUrl ? (
          <Button
            onClick={handleStartRecording}
            className="px-8 py-2  bg-[#4848F9] hover:bg-[#4848F9]/80 text-white border-none shadow-sm"
          >
            <MdMic className="size-5 mr-2" /> 녹음 시작하기
          </Button>
        ) : isRecording ? (
          <Button
            onClick={handleStopRecording}
            className="px-8 py-2  bg-red-600 hover:bg-red-700 text-white"
          >
            <MdStop className="size-5 mr-2" /> 녹음 중지하기
          </Button>
        ) : (
          <Button
            onClick={handleStartRecording}
            className="px-8 py-2  bg-[#4848F9] hover:bg-[#4848F9]/80 text-white"
          >
            <MdMic className="size-5 mr-2" /> 다시 녹음하기
          </Button>
        )}

        {chunks.length > 0 && !isRecording && (
          <Button
            onClick={onSubmitAudioFile}
            disabled={chunks.length === 0 || isRecording}
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

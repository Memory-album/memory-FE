import { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbPlayerPauseFilled } from 'react-icons/tb';
import { FaPlay } from 'react-icons/fa';
import Image from 'next/image';

import { Alert } from './alert';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = {
  message: string;
  chunks: Blob[];
  setChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
  onSubmitAudioFile: () => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const VoiceAnswer = ({
  message,
  chunks,
  setChunks,
  onSubmitAudioFile,
  isLoading = false,
  open,
  onOpenChange,
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
    let interval: NodeJS.Timeout | undefined;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else if (!isRecording && recordingDuration !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
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
    <div className="flex flex-col justify-between h-full items-center">
      <div className="w-full right-0 text-right">
        <Alert
          description="음성을 분석하고 있어요"
          buttonValue="다음"
          buttonClassName="disabled:bg-[#DAE2FF] w-[60px] h-[40px]"
          disabled={chunks.length === 0 || isRecording}
          onClick={onSubmitAudioFile}
          isLoading={isLoading}
          open={open}
          onOpenChange={onOpenChange}
        />
      </div>

      {/* 메시지 카드 */}
      {/* <div className="w-full max-w-md px-4">
        <div className="py-4 px-6 bg-white rounded-2xl text-[#4848F9] font-semibold text-xl border border-blue-200 text-center shadow-sm">
          {message}
        </div>
      </div> */}

      {/* 녹음 영역 */}
      <div>
        <div className="mb-4 pb-2 text-[#333333]  border border-1 border-solid border-transparent border-b-[#ccc]">
          <h1 className="text-[24px] font-semibold">녹음하기</h1>
          <ol>
            <li className="mt-3">
              <p>
                1. 녹음을 시작하려면{' '}
                <Image
                  alt="녹음 버튼"
                  width={34}
                  height={30}
                  className="inline"
                  src="/images/startRecording.png"
                />
                을 탭하세요.
              </p>
            </li>
            <li className="mt-3">
              <p>
                2. 녹음을 마치려면{' '}
                <Image
                  alt="중단 버튼"
                  width={30}
                  height={30}
                  className="inline"
                  src="/images/stopRecording.png"
                />
                을 탭하세요.
              </p>
            </li>
            <li className="mt-3">
              <p>
                3. 녹음을 검토하려면{' '}
                <Image
                  alt="재생 버튼"
                  width={27}
                  height={30}
                  className="inline"
                  src="/images/recording.png"
                />
                을 탭하세요.
              </p>
            </li>
            <li className="mt-3">
              <p>4. 녹음을 마친 뒤, 다음을 탭하세요.</p>
            </li>
          </ol>
        </div>
        <div className="border-solid border-1 border-[#ccc] w-full"></div>
        {isRecording && (
          <p className="text-center text-[47px] font-semibold text-black">
            {formatTime(recordingDuration)}
          </p>
        )}

        {/* 오디오 플레이어 - 녹음 후에만 표시 */}
        {audioUrl && !isRecording && (
          <div className="flex justify-between">
            <Button
              onClick={handleTogglePlayback}
              className="bg-transparent hover:bg-transparent h-10 w-10 border-none"
            >
              {isPlaying ? (
                <TbPlayerPauseFilled className="size-10 text-black" />
              ) : (
                <FaPlay className="size-8 text-black" />
              )}
            </Button>

            <Button
              onClick={handleDeleteRecording}
              className="bg-transparent border-none size-10 rounded-full text-[#4848F9] hover:bg-transparent"
            >
              <RiDeleteBinLine className="size-8 text-[#4848F9]" />
            </Button>
          </div>
        )}
      </div>

      {/* 액션 버튼 영역 */}
      <div className="">
        {!isRecording && !audioUrl ? (
          <Button
            onClick={handleStartRecording}
            className="p-0 size-[100px] rounded-full bg-white border-[5px] border-solid border-gray-400 hover:bg-white"
          >
            <p className="size-[80px] bg-red-500 rounded-full"></p>
          </Button>
        ) : isRecording ? (
          <Button
            onClick={handleStopRecording}
            className="p-0 size-[100px] rounded-full bg-white border-[5px] border-solid border-gray-400 hover:bg-white"
          >
            <p className="size-[40px] bg-red-500 rounded-[8px]"></p>
          </Button>
        ) : (
          <Button
            onClick={handleStartRecording}
            className="p-0 size-[100px] rounded-full bg-white border-[5px] border-solid border-gray-400 hover:bg-white"
          >
            <p className="size-[80px] bg-red-500 rounded-full"></p>
          </Button>
        )}
      </div>
    </div>
  );
};

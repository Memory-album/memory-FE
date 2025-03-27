import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '../loading-spinner';

type Props = {
  description: string;
  buttonValue?: string;
  buttonClassName?: string;
  disabled?: boolean;
  onClick: () => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export const Alert = ({
  description,
  buttonValue = '다음',
  buttonClassName,
  disabled,
  onClick,
  isLoading = false,
  open,
  onOpenChange,
  className,
}: Props) => {
  const [line1, line2] = description.split('<br />');
  const [loadingDots, setLoadingDots] = useState(0);

  // 로딩 점 애니메이션
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            'relative overflow-hidden transition-all duration-300',
            isLoading && 'cursor-not-allowed',
            buttonClassName,
          )}
          onClick={onClick}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              처리 중
            </span>
          ) : (
            buttonValue
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] rounded-[16px] sm:rounded-[16px] bg-white shadow-lg border-blue-100 overflow-hidden">
        <AlertDialogHeader className="pt-6">
          <AlertDialogTitle className="mb-6 text-xl text-center font-bold text-[#4848F9]">
            AI 이미지 분석 중입니다
          </AlertDialogTitle>
          {isLoading && (
            <div className="mt-6 flex justify-center">
              <LoadingSpinner size="md" />
            </div>
          )}
          <div className="relative mb-8 flex justify-center">
            <div
              className="absolute top-0 left-1/2 w-4 h-4 bg-blue-200 rounded-full animate-ping opacity-75"
              style={{ animationDuration: '1.5s', animationDelay: '0.2s' }}
            />
            <div
              className="absolute bottom-2 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-75"
              style={{ animationDuration: '2s', animationDelay: '0.5s' }}
            />
            <div
              className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-75"
              style={{ animationDuration: '2.5s', animationDelay: '1s' }}
            />
          </div>

          <p className="text-gray-500 text-center text-base mt-4">
            {line1}
            <span className="inline-block w-8 text-left ml-1">
              {'.'.repeat(loadingDots)}
            </span>
            <br />
            {line2}
          </p>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

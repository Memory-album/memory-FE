import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useViewStore } from '@/store/useViewStore';
import { Dispatch, SetStateAction, useCallback } from 'react';

type Props = {
  nextView: string;
  description: string;
  isLoading: boolean;
  question?: Dispatch<SetStateAction<string>>;
  buttonValue?: string;
  buttonClassName?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Alert = ({
  nextView,
  description,
  isLoading,
  question,
  buttonValue = '확인',
  buttonClassName,
  disabled,
  onClick,
}: Props) => {
  const [line1, line2] = description.split('<br />');
  const { setView } = useViewStore();

  const handleSetView = useCallback(() => {
    // setTimeout(() => {
    //   setView(nextView);
    // }, 5000);
  }, []);

  if (!isLoading) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={buttonClassName}
          onClick={onClick}
          disabled={disabled}
        >
          {buttonValue}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] rounded-[8px] sm:rounded-[8px] bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-[30px] text-xl text-center">
            잠시만 기다려주세요!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-center">
            {line1}
            <br />
            {line2}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

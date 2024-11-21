import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {
  onNextView: () => void;
  description: string;
  buttonValue?: string;
  buttonClassName?: string;
  disabled?: boolean;
};

export const Alert = ({
  onNextView,
  description,
  buttonValue = '확인',
  buttonClassName,
  disabled,
}: Props) => {
  const [line1, line2] = description.split('<br />');
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={buttonClassName}
          onClick={onNextView}
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

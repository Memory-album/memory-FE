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
import { BsMenuButton } from 'react-icons/bs';

type Props = {
  onNextView: () => void;
  description: string;
  buttonValue?: string;
  buttonClassName?: string;
};

export const Alert = ({
  onNextView,
  description,
  buttonValue = '확인',
  buttonClassName,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={buttonClassName} onClick={onNextView}>
          {buttonValue}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] rounded-[8px] bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-[30px] text-xl text-center">
            잠시만 기다려주세요!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

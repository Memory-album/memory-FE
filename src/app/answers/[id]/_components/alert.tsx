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
  currentView: (view: string) => void;
};

export const Alert = ({ currentView }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className=" text-white text-lg"
          onClick={() => {
            setTimeout(() => {
              currentView('input');
            }, 5000);
          }}
        >
          확인
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] rounded-[8px] bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-[30px] text-xl text-center">
            잠시만 기다려주세요!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-center">
            ai가 음성을 추출하고 있어요. <br /> 답변을 요약해서 보여드릴게요.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

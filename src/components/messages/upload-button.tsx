import { Button } from '@/components/ui/button';

type Props = {
  disabled?: boolean;
  onUpload: () => void;
};

export const UploadButton = ({ disabled = true, onUpload }: Props) => {
  // TODO: 버튼 위치 고정 .. 보류 어색한 것 같음
  return (
    <div className="flex justify-end mb-6">
      <Button
        variant="uploadBtn"
        size="uploadBtn"
        disabled={disabled}
        onClick={() => onUpload()}
      >
        저장
      </Button>
    </div>
  );
};

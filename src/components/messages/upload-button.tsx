import { Button } from '@/components/ui/button';

type Props = {
  disabled?: boolean;
  onUpload: () => void;
};

export const UploadButton = ({ disabled = true, onUpload }: Props) => {
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

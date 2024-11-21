import { Button } from '@/components/ui/button';

type Props = {
  disabled?: boolean;
};

export const UploadButton = ({ disabled = true }: Props) => {
  return (
    <div className="flex justify-end mb-6">
      <Button variant="uploadBtn" size="uploadBtn" disabled={disabled}>
        저장
      </Button>
    </div>
  );
};

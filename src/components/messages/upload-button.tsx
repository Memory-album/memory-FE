import { Button } from '@/components/ui/button';

export const UploadButton = () => {
  return (
    <div className="flex justify-end mb-6">
      <Button size="upload" variant="upload" disabled={false}>
        저장
      </Button>
    </div>
  );
};

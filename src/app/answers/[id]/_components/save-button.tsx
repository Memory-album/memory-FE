import { Button } from '@/components/ui/button';

export const SaveButton = () => {
  return (
    <div className="flex justify-end mb-6">
      <Button size="upload" variant="upload" disabled={false}>
        저장
      </Button>
    </div>
  );
};

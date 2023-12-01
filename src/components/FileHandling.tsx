import { Button } from '@geist-ui/core';

type FileHandlingProps = {
  resetLabel: string;
  onUpload: (e) => void;
  onReset: (e) => void;
};
export const FileHandling = ({
  resetLabel,
  onUpload,
  onReset
}: FileHandlingProps) => {
  return (
    <>
      <input type="file" onChange={onUpload} />

      <Button type="secondary" ghost auto scale={0.7} onClick={onReset}>
        {resetLabel}
      </Button>
    </>
  );
};

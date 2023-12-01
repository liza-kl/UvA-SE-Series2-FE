import { useEffect, useState } from 'react';

export const NoFileUploaded = () => {
  const [filePresent, setFilePresent] = useState<boolean>();

  useEffect(() => {
    localStorage.getItem('currentFile') == null
      ? setFilePresent(false)
      : setFilePresent(true);
  }, [localStorage.getItem('currentFile')]);

  return <div>No file present 🥲</div>;
};

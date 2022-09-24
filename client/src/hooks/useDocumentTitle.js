import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_BASE_APP_TITLE} - ${title}`;
    return () => {
      document.title = import.meta.env.VITE_BASE_APP_TITLE;
    };
  }, [title]);
};

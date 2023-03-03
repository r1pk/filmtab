import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const setDocumentTitle = () => {
      document.title = `${import.meta.env.VITE_BASE_APP_TITLE} :: ${title}`;
    };

    setDocumentTitle();
    return () => {
      const setDefaultDocumentTitle = () => {
        document.title = import.meta.env.VITE_BASE_APP_TITLE;
      };

      setDefaultDocumentTitle();
    };
  }, [title]);
};

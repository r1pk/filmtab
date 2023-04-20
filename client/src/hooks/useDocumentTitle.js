import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(
    function setDocumentTitle() {
      document.title = `${import.meta.env.VITE_BASE_APP_TITLE} :: ${title}`;

      return function setBaseDocumentTitle() {
        document.title = import.meta.env.VITE_BASE_APP_TITLE;
      };
    },
    [title]
  );
};

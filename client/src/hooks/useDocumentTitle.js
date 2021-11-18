import { useRef, useEffect } from 'react';

const useDocumentTitle = (title) => {
  const initialTitle = useRef(document.title);

  useEffect(() => {
    initialTitle.current = document.title;
    return () => {
      document.title = initialTitle.current;
    };
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;

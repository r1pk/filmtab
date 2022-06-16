import { useRef, useEffect } from 'react';

const useDocumentTitle = (title) => {
  const initialTitle = useRef(document.title);

  useEffect(() => {
    const previousTitle = initialTitle.current;

    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;

import { useState, useEffect, useRef } from 'react';

import screenfull from 'screenfull';

const useFullscreen = () => {
  const [isFullscreenActive, setFullscreenStatus] = useState(false);
  const containerRef = useRef(null);

  const handleScreenfullChange = () => {
    setFullscreenStatus(screenfull.isFullscreen);
  };

  useEffect(() => {
    screenfull.on('change', handleScreenfullChange);
    return () => {
      screenfull.off('change', handleScreenfullChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  return [isFullscreenActive, toggleFullscreen, containerRef];
};

export default useFullscreen;

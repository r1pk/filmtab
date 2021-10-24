import { useState, useEffect } from 'react';

import screenfull from 'screenfull';

const useFullscreen = (ref) => {
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  const handleScreenfullChange = () => {
    setIsFullscreenActive(screenfull.isFullscreen);
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && ref.current) {
      screenfull.toggle(ref.current);
    }
  };

  useEffect(() => {
    screenfull.on('change', handleScreenfullChange);
    return () => {
      screenfull.off('change', handleScreenfullChange);
    };
  }, []);

  return [isFullscreenActive, toggleFullscreen];
};

export default useFullscreen;

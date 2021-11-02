import { useState } from 'react';

import { useIdleTimer } from 'react-idle-timer';

const useIdleDetection = (minIdleTime = 5000) => {
  const [isUserIdle, setIsUserIdle] = useState(false);

  const handleOnIdle = () => {
    setIsUserIdle(true);
  };

  const handleOnActive = () => {
    setIsUserIdle(false);
  };

  useIdleTimer({
    timeout: minIdleTime,
    events: ['mousemove', 'touchstart', 'touchmove'],
    onIdle: handleOnIdle,
    onActive: handleOnActive,
  });

  return isUserIdle;
};

export default useIdleDetection;

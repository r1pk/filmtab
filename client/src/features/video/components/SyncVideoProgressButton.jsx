import PropTypes from 'prop-types';
import { useState, useEffect, useRef, forwardRef } from 'react';

import { Sync } from '@mui/icons-material';

import { Button } from '@/components';

const SyncVideoProgressButton = forwardRef(({ onSyncVideoProgress, timeoutTime, ...rest }, ref) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const timeout = useRef(null);

  const temporarilyDisableButton = () => {
    setIsButtonDisabled(true);

    timeout.current = setTimeout(() => setIsButtonDisabled(false), timeoutTime);
  };

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      onSyncVideoProgress();
      temporarilyDisableButton();
    }
  };

  useEffect(() => {
    return () => {
      const clearComponentTimeout = () => {
        clearTimeout(timeout.current);
      };

      clearComponentTimeout();
    };
  }, []);

  return (
    <Button startIcon={<Sync />} disabled={isButtonDisabled} onClick={handleButtonClick} ref={ref} {...rest}>
      Resynchronize video
    </Button>
  );
});

SyncVideoProgressButton.displayName = 'SyncVideoProgressButton';

SyncVideoProgressButton.propTypes = {
  onSyncVideoProgress: PropTypes.func.isRequired,
  timeoutTime: PropTypes.number.isRequired,
};

export default SyncVideoProgressButton;

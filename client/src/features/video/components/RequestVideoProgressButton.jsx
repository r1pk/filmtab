import PropTypes from 'prop-types';
import { useState, useEffect, useRef, forwardRef } from 'react';

import { Sync } from '@mui/icons-material';

import Button from '@/components/form/Button';

const RequestVideoProgressButton = forwardRef(({ onRequestVideoProgress, timeoutTime, ...rest }, ref) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const timeout = useRef(null);

  const temporarilyDisableButton = () => {
    setIsButtonDisabled(true);

    timeout.current = setTimeout(() => setIsButtonDisabled(false), timeoutTime);
  };

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      onRequestVideoProgress();
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

RequestVideoProgressButton.displayName = 'RequestVideoProgressButton';

RequestVideoProgressButton.propTypes = {
  onRequestVideoProgress: PropTypes.func.isRequired,
  timeoutTime: PropTypes.number.isRequired,
};

export default RequestVideoProgressButton;

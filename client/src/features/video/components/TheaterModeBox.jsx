import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

const TheaterModeBox = ({ children, isTheaterModeActive, ...rest }) => {
  const box = useRef(null);

  const theaterModeStyles = {
    display: 'grid',
    height: window.innerHeight,
  };

  useEffect(() => {
    if (isTheaterModeActive && box.current) {
      box.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTheaterModeActive]);

  return (
    <Box ref={box} sx={isTheaterModeActive ? theaterModeStyles : null} {...rest}>
      {children}
    </Box>
  );
};

TheaterModeBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isTheaterModeActive: PropTypes.bool,
};

export default TheaterModeBox;

import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';

const DeleteSubtitlesButton = forwardRef(({ onConfirmedClick, ...rest }, ref) => {
  const handleButtonClick = (e) => {
    const isActionConfirmed = window.confirm('Are you sure you want to delete subtitles for everyone in this room?');

    if (!isActionConfirmed) {
      return;
    }

    onConfirmedClick(e);
  };

  return (
    <Button
      size="small"
      variant="contained"
      startIcon={<DeleteOutline />}
      onClick={handleButtonClick}
      ref={ref}
      {...rest}
    >
      Delete subtitles
    </Button>
  );
});

DeleteSubtitlesButton.displayName = 'DeleteSubtitlesButton';

DeleteSubtitlesButton.propTypes = {
  onConfirmedClick: PropTypes.func.isRequired,
};

export default DeleteSubtitlesButton;

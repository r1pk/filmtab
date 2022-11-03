import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { DeleteOutline } from '@mui/icons-material';

import { Button } from '@/components';

const DeleteVideoSubtitlesButton = forwardRef(({ onDeleteVideoSubtitles, ...rest }, ref) => {
  const handleButtonClick = () => {
    const isActionConfirmed = window.confirm('Are you sure you want to delete subtitles for everyone in this room?');

    if (isActionConfirmed) {
      onDeleteVideoSubtitles();
    }
  };

  return (
    <Button startIcon={<DeleteOutline />} onClick={handleButtonClick} ref={ref} {...rest}>
      Delete subtitles
    </Button>
  );
});

DeleteVideoSubtitlesButton.displayName = 'DeleteVideoSubtitlesButton';

DeleteVideoSubtitlesButton.propTypes = {
  onDeleteVideoSubtitles: PropTypes.func.isRequired,
};

export default DeleteVideoSubtitlesButton;

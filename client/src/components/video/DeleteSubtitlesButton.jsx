import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { DeleteOutline } from '@mui/icons-material';

import Button from '@/components/common/Button';

const DeleteSubtitlesButton = forwardRef(({ onDeleteSubtitles, ...rest }, ref) => {
  const handleButtonClick = () => {
    const isActionConfirmed = window.confirm('Are you sure you want to delete subtitles for everyone in this room?');

    if (isActionConfirmed) {
      onDeleteSubtitles();
    }
  };

  return (
    <Button startIcon={<DeleteOutline />} onClick={handleButtonClick} ref={ref} {...rest}>
      Delete subtitles
    </Button>
  );
});

DeleteSubtitlesButton.displayName = 'DeleteSubtitlesButton';

DeleteSubtitlesButton.propTypes = {
  onDeleteSubtitles: PropTypes.func.isRequired,
};

export default DeleteSubtitlesButton;

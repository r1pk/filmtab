import PropTypes from 'prop-types';

import { Clear } from '@mui/icons-material';

import Button from '../../../components/Button';

const ClearSubtitlesButton = ({ onClearSubtitles, ...rest }) => {
  const handleButtonClick = () => {
    const userConfirmed = window.confirm('Are you sure you want to clear the subtitles?');

    if (userConfirmed) {
      onClearSubtitles();
    }
  };

  return (
    <Button variant="text" startIcon={<Clear />} onClick={handleButtonClick} {...rest}>
      Clear subtitles
    </Button>
  );
};

ClearSubtitlesButton.propTypes = {
  onClearSubtitles: PropTypes.func.isRequired,
};

export default ClearSubtitlesButton;

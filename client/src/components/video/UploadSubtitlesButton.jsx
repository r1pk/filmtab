import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { UploadFileOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

const UploadSubtitlesButton = forwardRef(({ onSubtitlesLoaded, ...rest }, ref) => {
  const handleLoadedFile = (event) => {
    onSubtitlesLoaded(event.target.result);
  };

  const handleInputChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file.type !== 'text/vtt') {
      return toast.error('Unsupported file type');
    }

    reader.addEventListener('load', handleLoadedFile);
    reader.readAsText(file);
  };

  return (
    <Button size="small" variant="contained" component="label" startIcon={<UploadFileOutlined />} ref={ref} {...rest}>
      Upload subtitles
      <input type="file" accept="text/vtt" hidden onChange={handleInputChange} />
    </Button>
  );
});

UploadSubtitlesButton.displayName = 'UploadSubtitlesButton';

UploadSubtitlesButton.propTypes = {
  onSubtitlesLoaded: PropTypes.func.isRequired,
};

export default UploadSubtitlesButton;

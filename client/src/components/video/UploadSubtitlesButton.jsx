import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { UploadFileOutlined } from '@mui/icons-material';

const UploadSubtitlesButton = forwardRef(({ onUploadSubtitles, ...rest }, ref) => {
  const handleFile = (event) => {
    onUploadSubtitles(event.target.result);
  };

  const handleInputChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file.type !== 'text/vtt') {
      return toast.error('Unsupported file type');
    }

    reader.addEventListener('load', handleFile);
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
  onUploadSubtitles: PropTypes.func.isRequired,
};

export default UploadSubtitlesButton;

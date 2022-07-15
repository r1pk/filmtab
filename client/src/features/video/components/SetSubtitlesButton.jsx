import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { UploadFile } from '@mui/icons-material';

import Button from '../../../components/Button';

import { getUniqueId } from '../utils/getUniqueId';

const SetSubtitlesButton = ({ onSetSubtitles, ...rest }) => {
  const uniqueId = useMemo(() => getUniqueId(), []);

  const handleInputChange = ({ target }) => {
    const [file] = target.files;

    if (file.type !== 'text/vtt') {
      return alert('Please select a valid VTT file');
    }

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      onSetSubtitles(event.target.result);
    });

    reader.readAsText(file);
  };

  return (
    <>
      <input type="file" accept="text/vtt" hidden id={uniqueId} onChange={handleInputChange} />
      <label htmlFor={uniqueId}>
        <Button variant="text" startIcon={<UploadFile />} component="span" {...rest}>
          Upload subtitles
        </Button>
      </label>
    </>
  );
};

SetSubtitlesButton.propTypes = {
  onSetSubtitles: PropTypes.func.isRequired,
};

export default SetSubtitlesButton;

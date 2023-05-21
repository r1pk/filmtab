import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

import { Refresh } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const UsernameField = forwardRef(({ onGenerateUsername, ...rest }, ref) => {
  const handleIconButtonClick = () => {
    onGenerateUsername(
      uniqueNamesGenerator({
        style: 'capital',
        separator: '',
        dictionaries: [colors, animals],
        length: 2,
      })
    );
  };

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleIconButtonClick}>
              <Refresh />
            </IconButton>
          </InputAdornment>
        ),
      }}
      ref={ref}
      {...rest}
    />
  );
});

UsernameField.displayName = 'UsernameField';

UsernameField.propTypes = {
  onGenerateUsername: PropTypes.func.isRequired,
};

export default UsernameField;

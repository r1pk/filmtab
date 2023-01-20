import { forwardRef } from 'react';

import { FormControlLabel as MUIFormControlLabel } from '@mui/material';

const FormControlLabel = forwardRef((props, ref) => {
  return <MUIFormControlLabel ref={ref} {...props} />;
});

FormControlLabel.displayName = 'FormControlLabel';

export default FormControlLabel;

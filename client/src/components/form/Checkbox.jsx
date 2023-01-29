import { forwardRef } from 'react';

import { Checkbox as MUICheckbox } from '@mui/material';

const Checkbox = forwardRef((props, ref) => {
  return <MUICheckbox size="medium" ref={ref} {...props} />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

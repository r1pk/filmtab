import { forwardRef } from 'react';

import { TextField as MUITextField } from '@mui/material';

const TextField = forwardRef((props, ref) => {
  return <MUITextField variant="standard" size="small" {...props} ref={ref} />;
});

TextField.displayName = 'TextField';

export default TextField;

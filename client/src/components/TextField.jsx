import { forwardRef } from 'react';

import { TextField as MUITextField } from '@mui/material';

const TextField = (props, ref) => {
  return <MUITextField variant="standard" size="small" {...props} ref={ref} />;
};

export default forwardRef(TextField);

import { forwardRef } from 'react';

import { Button as MUIButton } from '@mui/material';

const Button = forwardRef((props, ref) => {
  return <MUIButton size="small" variant="contained" ref={ref} {...props} />;
});

Button.displayName = 'Button';

export default Button;

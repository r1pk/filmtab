import { forwardRef } from 'react';

import { IconButton as MUIIconButton } from '@mui/material';

const IconButton = forwardRef((props, ref) => {
  return <MUIIconButton size="small" ref={ref} {...props} />;
});

IconButton.displayName = 'IconButton';

export default IconButton;

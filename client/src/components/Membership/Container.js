import PropTypes from 'prop-types';

import { Box, Typography, Divider } from '@mui/material';

const Container = ({ header, children }) => {
  return (
    <Box sx={{ m: 1, p: 2, border: '1px solid #282828' }}>
      <Typography variant="h6">{header}</Typography>
      <Divider sx={{ my: 1 }} />
      {children}
    </Box>
  );
};

Container.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Container;

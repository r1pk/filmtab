import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import FixedBackground from './FixedBackground';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ p: 2 }}>
      <FixedBackground />
      {children}
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MainLayout;

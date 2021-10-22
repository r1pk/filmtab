import PropTypes from 'prop-types';

import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = ({ label, ...rest }) => {
  return <FormControlLabel control={<MuiCheckbox {...rest} />} label={label} sx={{ height: '45px' }} />;
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Checkbox;

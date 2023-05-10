import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedOutlet = forwardRef(({ disabled, fallback, state, ...rest }, ref) => {
  return disabled ? <Outlet ref={ref} {...rest} /> : <Navigate to={fallback} state={state} ref={ref} {...rest} />;
});

ProtectedOutlet.displayName = 'ProtectedOutlet';

ProtectedOutlet.propTypes = {
  disabled: PropTypes.bool.isRequired,
  fallback: PropTypes.string.isRequired,
  state: PropTypes.object,
};

export default ProtectedOutlet;

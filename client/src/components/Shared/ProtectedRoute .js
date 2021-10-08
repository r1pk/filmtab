import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ children, routeEnabled, fallbackPath, ...rest }) => {
  return (
    <Route {...rest}>
      {routeEnabled ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: fallbackPath,
            state: {
              params: rest.computedMatch.params,
            },
          }}
        />
      )}
    </Route>
  );
};

ProtectedRoute.propTypes = {
  routeEnabled: PropTypes.bool.isRequired,
  fallbackPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

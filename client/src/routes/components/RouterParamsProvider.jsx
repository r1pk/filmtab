import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';

const RouterParamsProvider = ({ children }) => {
  const params = useParams();

  return children(params);
};

RouterParamsProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RouterParamsProvider;

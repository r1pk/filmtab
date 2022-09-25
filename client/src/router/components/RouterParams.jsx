import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';

const RouterParams = ({ children }) => {
  const params = useParams();

  return children(params);
};

RouterParams.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RouterParams;

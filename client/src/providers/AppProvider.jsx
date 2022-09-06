import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { store } from '@/redux';

export const AppProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

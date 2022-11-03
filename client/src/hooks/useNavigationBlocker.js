import { useEffect, useContext } from 'react';

import { UNSAFE_NavigationContext } from 'react-router-dom';

export const useNavigationBlocker = (callback, active = true) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    const blockNavigation = () => {
      if (!active) {
        return null;
      }

      const unblock = navigator.block((transition) => {
        const autoUnblockingTransition = {
          ...transition,
          retry() {
            unblock();
            transition.retry();
          },
        };

        callback(autoUnblockingTransition);
      });

      return unblock;
    };

    return blockNavigation();
  }, [navigator, callback, active]);
};

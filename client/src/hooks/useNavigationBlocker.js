import { useEffect, useContext } from 'react';

import { UNSAFE_NavigationContext } from 'react-router-dom';

export const useNavigationBlocker = (callback, active = true) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(
    function createNavigationBlocker() {
      if (!active) {
        return null;
      }

      const unblockNavigation = navigator.block((transition) => {
        const autoUnblockingTransition = {
          ...transition,
          retry() {
            unblockNavigation();
            transition.retry();
          },
        };

        callback(autoUnblockingTransition);
      });

      return function removeNavigationBlocker() {
        unblockNavigation();
      };
    },
    [navigator, callback, active]
  );
};

import { useEffect } from 'react';

import { RootState } from '../../model/redux/store';
import { useStore } from 'react-redux';

/**
 * Custom hook to persist the Redux state to localStorage before the window unloads or the component unmounts.
 *
 * @example
 * const App = () => {
 *   usePersist();
 *   return <div>Content</div>;
 * };
 */
const usePersist = () => {
  const store = useStore<RootState>();

  useEffect(() => {
    const handleBeforeUnload = () => {
      const state = store.getState();
      localStorage.setItem('State', JSON.stringify(state));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      const state = store.getState();
      localStorage.setItem('State', JSON.stringify(state));
    };
  }, [store]);
};

export default usePersist;
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAsyncOptions {
  dependencies?: any[];
  preventRefetch?: boolean;
}

/**
 * A custom hook to handle asynchronous operations.
 *
 * @template T The type of the value returned by the asynchronous operation.
 * @param {() => Promise<T>} callback - The asynchronous function to execute.
 * @param {UseAsyncOptions} [options={}] - Optional settings for the hook.
 * @param {any[]} [options.dependencies=[]] - Dependencies that trigger re-fetch when changed.
 * @param {boolean} [options.preventRefetch=true] - Prevents refetching if already fetched once.
 * @returns {{ loading: boolean; error: any; value: T | undefined }} An object containing the loading state, error, and value.
 *
 * @example
 * const { loading, error, value } = useAsync(() => fetchSomeData(), { dependencies: [someDependency], preventRefetch: false });
 */
const useAsync = <T,>(callback: () => Promise<T>, options: UseAsyncOptions = {}) => {
  const { dependencies = [], preventRefetch = true } = options;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);
  const [value, setValue] = useState<T | undefined>(undefined);

  const hasFetched = useRef(false);

  const callbackMemoized = useCallback(() => {
    if (preventRefetch && hasFetched.current) {
      return;
    }
    setLoading(true);
    callback()
      .then(newValue => {
        setValue(newValue);
      })
      .catch(setError)
      .finally(() => {
        hasFetched.current = true;
        setLoading(false);
      });
  }, [callback, ...dependencies]);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
};

export default useAsync;


// import useAsync from "./useAsync"
// const { loading, error, value } = useAsync(fetchData, {preventRefetch:true})
// <p>loading: {loading}, error: {error}, value: {JSON.stringify(value)}</p>

// const AsyncComponent = () => {
//   const { loading, error, value } = useAsync(() => {
//     return new Promise((resolve, reject) => {
//       const success = false
//       setTimeout(() => {
//         success ? resolve("Hi") : reject("Error")
//       }, 1000)
//     })
//   })

//   return (
//     <div>
//       <div>Loading: {loading.toString()}</div>
//       <div>{error}</div>
//       <div>{value}</div>
//     </div>
//   )
// }


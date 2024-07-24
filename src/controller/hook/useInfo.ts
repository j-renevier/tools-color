import { useEffect } from "react";

/**
 * Custom hook to log messages when a component mounts and unmounts.
 *
 * @param {string} context - The context or name of the component.
 *
 * @example
 * const MyComponent = () => {
 *   useInfo('MyComponent');
 *   return <div>Content</div>;
 * };
 */
const useInfo = (context:string) => {

  useEffect (()=>{
    console.log(`%cMount ${context} component!` , 'color: orange;');

    return () => {
      console.log(`%cUnmount ${context} component!` , 'color: orange;');
    }
  }, []);
}

export default useInfo;
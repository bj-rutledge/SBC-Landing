/**
 * Created by BJ Rutledge
 * Date:2024-12-22
 **/
import { useEffect, useRef, useState, MutableRefObject } from 'react';

interface IntersectionObserverOptions {
   root?: Element | null;
   rootMargin?: string;
   threshold?: number | number[];
}

/**
 * useOnScreen Hook
 * This custom hook uses the Intersection Observer API to determine
 * if an element is visible on the screen. It sets a boolean state
 * that indicates whether the observed element is in the viewport.
 *
 * @param {IntersectionObserverOptions} options - Intersection Observer options.
 * @returns {[MutableRefObject<null>, boolean]} - A tuple containing the
 * reference to be attached to the element and a boolean indicating
 * visibility.
 */
export const useOnScreen = (options: IntersectionObserverOptions): [MutableRefObject<null>, boolean] => {
   // Create a ref that will be attached to the observed element
   const ref = useRef(null);

   // State to keep track of visibility
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Create an Intersection Observer instance
      const observer = new IntersectionObserver(([entry]) => {
         // Update the visibility state based on the entry's intersection
         setIsVisible(entry.isIntersecting);
      }, options);

      // Observe the element when the ref is attached
      if (ref.current) {
         observer.observe(ref.current);
      }

      // Cleanup function to unobserve the element when the component is unmounted
      return () => {
         if (ref.current) {
            observer.unobserve(ref.current);
         }
      };
   }, [ref, options]);

   // Return the ref and visibility state
   return [ref, isVisible];
};

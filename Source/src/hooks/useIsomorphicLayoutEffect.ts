/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 **/
import * as React from 'react';

const useIsomorphicLayoutEffect =
   typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default useIsomorphicLayoutEffect;

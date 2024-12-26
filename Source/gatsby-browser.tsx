import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './src/theme';
import './src/global.css';
import { SbcOutputDataProvider } from './src/contexts/SbcOutputDataContext';

export const wrapRootElement = ({ element }) => (
  <ChakraProvider theme={theme}>
    <SbcOutputDataProvider>
      {element}
    </SbcOutputDataProvider>
  </ChakraProvider>
);
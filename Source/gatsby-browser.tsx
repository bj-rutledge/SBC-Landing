import * as React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './src/theme';
import './src/global.css';
import './src/styles.css';
import { SbcOutputDataProvider } from './src/contexts/SbcOutputDataContext';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <ChakraProvider theme={theme}>
    <SbcOutputDataProvider>
      {element}
    </SbcOutputDataProvider>
  </ChakraProvider>
);
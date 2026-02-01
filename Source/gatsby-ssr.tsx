import * as React from 'react';
import type { GatsbySSR } from 'gatsby';
import { ColorModeScript } from '@chakra-ui/react';
import { WrapRootElement } from './src/provider';
import customTheme from './src/theme';
// @ts-ignore
import './src/global.css';
// @ts-ignore
import './src/styles.css';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
   setPreBodyComponents,
}) => {
   setPreBodyComponents([
      <ColorModeScript
         initialColorMode={customTheme.config.initialColorMode}
         key="chakra-ui-no-flash"
      />,
   ]);
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
   <WrapRootElement element={element} />
);
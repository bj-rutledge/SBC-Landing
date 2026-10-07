import * as React from 'react';
import type { GatsbySSR } from 'gatsby';
import { ColorModeScript } from '@chakra-ui/react';
import { WrapRootElement } from './src/provider';
import customTheme from './src/theme';
import './src/global.css';
import './src/styles.css';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
   setHeadComponents,
   setPreBodyComponents,
   setPostBodyComponents,
}) => {
   setHeadComponents([
      <script
         key="webtrax-tracking"
         dangerouslySetInnerHTML={{
            __html: `
               var wto = wto || [];
               wto.push(['setWTID', 'wt-c62d6847-7167-414d-966c-225c6e3794f6']);
               wto.push(['webTraxs']);
               (function() {
                  var wt = document.createElement('script');
                  wt.src = document.location.protocol + '//www.webtraxs.com/wt.php';
                  wt.type = 'text/javascript';
                  wt.async = true;
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(wt, s);
               })();
            `,
         }}
      />,
   ]);
   setPreBodyComponents([
      <ColorModeScript
         initialColorMode={customTheme.config.initialColorMode}
         key="chakra-ui-no-flash"
      />,
   ]);
   setPostBodyComponents([
      <noscript key="webtrax-noscript">
         <img
            src="https://www.webtraxs.com/webtraxs.php?id=wt-c62d6847-7167-414d-966c-225c6e3794f6&st=img"
            alt=""
         />
      </noscript>,
   ]);
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
   <WrapRootElement element={element} />
);
/**
 * Created by BJ Rutledge
 * Date:2024-12-08
 * Gatsby config
 **/

import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
   siteMetadata: {
      // siteUrl: 'http://www.soundbuildinginc.com',
      title: 'Home - Sound Building Components Inc. | Sedro Woolley, WA',
      language: 'en_US',
      // url: "http://www.soundbuildinginc.com",
      copyright: 'Sound Building Components Inc. | Sedro Woolley, WA',
      description:
         'Welcome to Sound Building Components. Sound Building Components (SBC) was formed out of necessity to modernize the “Wall Panel” component for...',
      author: 'Big Dog Development / BJ Rutledge',
   },
   // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
   // If you use VSCode you can also use the GraphQL plugin
   // Learn more at: https://gatsby.dev/graphql-typegen
   graphqlTypegen: true,
   plugins: [
      'gatsby-plugin-image',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
         resolve: 'gatsby-plugin-manifest',
         options: {
            name: 'Sound Building Components Inc.',
            short_name: 'SBC',
            start_url: '/',
            background_color: '#ffffff',
            theme_color: '#319795',
            display: 'standalone',
            icon: './src/images/sbcfavicon.png',
         },
      },
      // Other plugins...
   ],
};

export default config;
